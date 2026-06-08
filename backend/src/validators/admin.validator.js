const { body } = require("express-validator");
const { ADMIN_ROLES } = require("../constants");

const signupValidator = [
  body("firstName").trim().notEmpty().withMessage("First name is required").isLength({ min: 2, max: 30 }),
  body("lastName").trim().notEmpty().withMessage("Last name is required").isLength({ min: 2, max: 30 }),
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Provide a valid email"),
  body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("phoneNumber").trim().notEmpty().withMessage("Phone number is required").isLength({ min: 10, max: 15 }).withMessage("Provide a valid phone number"),
];

const createAdminValidator = [
  ...signupValidator,
  body("role")
    .optional()
    .isIn(Object.values(ADMIN_ROLES))
    .withMessage(`Role must be one of: ${Object.values(ADMIN_ROLES).join(", ")}`),
];

const loginValidator = [
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const updateProfileValidator = [
  body("firstName").optional().trim().isLength({ min: 2, max: 30 }),
  body("lastName").optional().trim().isLength({ min: 2, max: 30 }),
  body("phoneNumber").optional().trim().isLength({ min: 10, max: 15 }),
];

const changePasswordValidator = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword").notEmpty().withMessage("New password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

module.exports = {
  signupValidator,
  createAdminValidator,
  loginValidator,
  updateProfileValidator,
  changePasswordValidator,
};
