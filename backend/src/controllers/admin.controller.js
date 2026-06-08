const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const AppError = require("../utils/AppError");
const adminService = require("../services/admin.service");
const cloudinaryService = require("../services/cloudinary.service");
const { sendTokenResponse, clearTokenCookie } = require("../utils/generateToken");
const { COOKIE_NAME } = require("../constants");
const Admin = require("../models/admin.model");

/**
 * The very first admin to sign up becomes the super admin.
 * After that, only an existing super admin may create more admins (see createAdmin).
 */
const signup = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  const totalAdmins = await adminService.countAdmins();

  let admin;
  if (totalAdmins === 0) {
    admin = await adminService.createFirstSuperAdmin({ firstName, lastName, email, password, phoneNumber });
  } else {
    return ApiResponse.error(res, {
      statusCode: 403,
      message: "Signup is closed. Ask a super admin to create your account",
    });
  }

  const token = sendTokenResponse(res, { id: admin._id, role: admin.role });

  return ApiResponse.success(res, {
    statusCode: 201,
    message: "Super admin account created successfully",
    data: { admin: admin.toSafeObject(), token },
  });
});

const createAdmin = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, role } = req.body;

  const admin = await adminService.createAdminByExisting(
    { firstName, lastName, email, password, phoneNumber, role },
    req.admin
  );

  return ApiResponse.success(res, {
    statusCode: 201,
    message: "Admin created successfully",
    data: { admin: admin.toSafeObject() },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await adminService.validateCredentials(email, password);
  admin.lastLoginAt = new Date();
  await admin.save({ validateBeforeSave: false });

  const token = sendTokenResponse(res, { id: admin._id, role: admin.role });

  return ApiResponse.success(res, {
    statusCode: 200,
    message: "Login successful",
    data: { admin: admin.toSafeObject(), token },
  });
});

const logout = asyncHandler(async (req, res) => {
  clearTokenCookie(res);
  return ApiResponse.success(res, { statusCode: 200, message: "Logged out successfully" });
});

const getProfile = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, {
    statusCode: 200,
    message: "Profile fetched successfully",
    data: { admin: req.admin },
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = ["firstName", "lastName", "phoneNumber"];
  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  if (req.file) {
    if (req.admin.profileImage?.publicId) {
      await cloudinaryService.deleteImage(req.admin.profileImage.publicId);
    }
    const uploaded = await cloudinaryService.uploadImage(req.file, "admin-profiles");
    updates.profileImage = uploaded;
  }

  const admin = await Admin.findByIdAndUpdate(req.admin._id, updates, {
    new: true,
    runValidators: true,
  });

  return ApiResponse.success(res, {
    statusCode: 200,
    message: "Profile updated successfully",
    data: { admin },
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const admin = await Admin.findById(req.admin._id).select("+password");
  const isMatch = await admin.comparePassword(currentPassword);

  if (!isMatch) {
    throw new AppError("Current password is incorrect", 400);
  }

  admin.password = newPassword;
  await admin.save();

  clearTokenCookie(res);

  return ApiResponse.success(res, {
    statusCode: 200,
    message: "Password changed successfully. Please log in again",
  });
});

const listAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find().sort({ createdAt: -1 });

  return ApiResponse.success(res, {
    statusCode: 200,
    message: "Admins fetched successfully",
    data: { admins, count: admins.length },
  });
});

const toggleAdminStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (id === String(req.admin._id)) {
    throw new AppError("You cannot deactivate your own account", 400);
  }

  const admin = await Admin.findById(id);
  if (!admin) throw new AppError("Admin not found", 404);

  if (admin.role === "super_admin") {
    throw new AppError("Super admin accounts cannot be deactivated", 403);
  }

  admin.isActive = !admin.isActive;
  await admin.save({ validateBeforeSave: false });

  return ApiResponse.success(res, {
    statusCode: 200,
    message: `Admin ${admin.isActive ? "activated" : "deactivated"} successfully`,
    data: { admin },
  });
});

module.exports = {
  signup,
  createAdmin,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  listAdmins,
  toggleAdminStatus,
};
