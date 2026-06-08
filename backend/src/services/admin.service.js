const Admin = require("../models/admin.model");
const AppError = require("../utils/AppError");
const { ADMIN_ROLES } = require("../constants");

const findByEmailOrPhone = (email, phoneNumber) =>
  Admin.findOne({ $or: [{ email }, { phoneNumber }] });

const ensureUnique = async (email, phoneNumber) => {
  const existing = await findByEmailOrPhone(email, phoneNumber);
  if (existing) {
    throw new AppError("An admin with this email or phone number already exists", 409);
  }
};

const createFirstSuperAdmin = async (payload) => {
  await ensureUnique(payload.email, payload.phoneNumber);

  return Admin.create({
    ...payload,
    role: ADMIN_ROLES.SUPER_ADMIN,
    createdBy: null,
  });
};

const createAdminByExisting = async (payload, creator) => {
  if (creator.role !== ADMIN_ROLES.SUPER_ADMIN) {
    throw new AppError("Only a super admin can create another admin", 403);
  }

  await ensureUnique(payload.email, payload.phoneNumber);

  return Admin.create({
    ...payload,
    role: payload.role && payload.role === ADMIN_ROLES.SUPER_ADMIN ? ADMIN_ROLES.SUPER_ADMIN : ADMIN_ROLES.ADMIN,
    createdBy: creator._id,
  });
};

const validateCredentials = async (email, password) => {
  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!admin.isActive) {
    throw new AppError("Your account has been deactivated. Contact super admin", 403);
  }

  return admin;
};

const countAdmins = () => Admin.countDocuments();

module.exports = {
  findByEmailOrPhone,
  ensureUnique,
  createFirstSuperAdmin,
  createAdminByExisting,
  validateCredentials,
  countAdmins,
};
