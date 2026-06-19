const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const Admin = require("../models/admin.model");
const env = require("../config/env");
const { COOKIE_NAME } = require("../constants");

const isAuthenticated = asyncHandler(async (req, res, next) => {
  
  const token =
    req.cookies?.[COOKIE_NAME] ||
    (req.headers.authorization?.startsWith("Bearer") && req.headers.authorization.split(" ")[1]);
console.log("Cookies:", req.cookies);
console.log("Cookie Name:", COOKIE_NAME);
console.log("TOKEN:", token);
  if (!token) {
    return next(new AppError("You are not logged in. Please log in to continue", 401));
  }

  let decoded;
  try {
   

    decoded = jwt.verify(token, env.jwt.secret);
  } catch (error) {
    console.error("Token verification error:", error);
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

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.admin) {
    return next(new AppError("You are not logged in. Please log in to continue", 401));
    console.log("ADMIN:", req.admin);
  }

  if (!roles.includes(req.admin.role)) {
    return next(new AppError("You do not have permission to perform this action", 403));
    console.log("ADMIN ROLE:", req.admin.role);
  }

  next();
};

module.exports = { isAuthenticated, authorizeRoles };
