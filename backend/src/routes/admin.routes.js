const express = require("express");
const adminController = require("../controllers/admin.controller");
const validate = require("../middleware/validate.middleware");
const upload = require("../middleware/upload.middleware");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth.middleware");
const { authLimiter } = require("../middleware/rateLimiter.middleware");
const {
  signupValidator,
  createAdminValidator,
  loginValidator,
  updateProfileValidator,
  changePasswordValidator,
} = require("../validators/admin.validator");
const { ADMIN_ROLES } = require("../constants");

const router = express.Router();

// Public
router.post("/signup", authLimiter, signupValidator, validate, adminController.signup);
router.post("/login", authLimiter, loginValidator, validate, adminController.login);

// Authenticated
router.use(isAuthenticated);

router.post("/logout", adminController.logout);
router.get("/me", adminController.getProfile);
router.patch("/me", upload.single("profileImage"), updateProfileValidator, validate, adminController.updateProfile);
router.patch("/change-password", changePasswordValidator, validate, adminController.changePassword);

// Super admin only
router.post(
  "/create",
  authorizeRoles(ADMIN_ROLES.SUPER_ADMIN),
  createAdminValidator,
  validate,
  adminController.createAdmin
);
router.get("/", authorizeRoles(ADMIN_ROLES.SUPER_ADMIN), adminController.listAdmins);
router.patch("/:id/toggle-status", authorizeRoles(ADMIN_ROLES.SUPER_ADMIN), adminController.toggleAdminStatus);

module.exports = router;
