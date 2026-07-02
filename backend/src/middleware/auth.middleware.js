const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const Admin = require("../models/admin.model");
const env = require("../config/env");
const { COOKIE_NAME } = require("../constants");

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.[COOKIE_NAME] ||
    (req.headers.authorization?.startsWith("Bearer ") && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return next(new AppError("You are not logged in. Please log in to continue", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, env.jwt.secret);
  } catch (error) {
    return next(new AppError("Invalid or expired token. Please log in again", 401));
  }

  const admin = await Admin.findById(decoded.id).select("-password");
  if (!admin) {
    return next(new AppError("The admin belonging to this token no longer exists", 401));
  }

  if (!admin.isActive) {
    return next(new AppError("Your account has been deactivated. Contact super admin", 403));
  }

  req.admin = admin;
  next();
});

// Populates req.admin when a valid admin session is present, but never
// rejects the request — used on public routes that return more data to
// logged-in admins without requiring login for everyone else.
const attachAdminIfPresent = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.[COOKIE_NAME] ||
    (req.headers.authorization?.startsWith("Bearer ") && req.headers.authorization.split(" ")[1]);

  if (!token) return next();

  try {
    const decoded = jwt.verify(token, env.jwt.secret);
    const admin = await Admin.findById(decoded.id).select("-password");
    if (admin && admin.isActive) req.admin = admin;
  } catch (error) {
    // Invalid/expired token on a public route — proceed as anonymous.
  }

  next();
});

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.admin) {
    return next(new AppError("You are not logged in. Please log in to continue", 401));
  }

  if (!roles.includes(req.admin.role)) {
    return next(new AppError("You do not have permission to perform this action", 403));
  }

  next();
};

module.exports = { isAuthenticated, attachAdminIfPresent, authorizeRoles };
