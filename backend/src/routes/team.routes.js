const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const validate = require("../middleware/validate.middleware");
const { isAuthenticated, attachAdminIfPresent } = require("../middleware/auth.middleware");
const { contactLimiter } = require("../middleware/rateLimiter.middleware");
const { createTeamValidator, updateTeamValidator } = require("../validators/team.validator");

const {
  createTeamMember,
  updateTeamMember,
  getTeamMembers,
  getTeamMemberById,
  deleteTeamMember,
} = require("../controllers/team.controller");

// Public — used by the public /team page. attachAdminIfPresent lets a
// logged-in admin (the admin panel calling these same endpoints) still get
// full documents; anonymous requests get the restricted public field set.
router.get("/", attachAdminIfPresent, getTeamMembers);
router.get("/:id", attachAdminIfPresent, getTeamMemberById);

// Public — the "Become a Member" page creates the team member directly, no
// admin review step. contactLimiter caps submissions per IP to curb spam
// since this is an unauthenticated write endpoint.
router.post(
  "/apply",
  contactLimiter,
  upload.single("profileImage"),
  createTeamValidator,
  validate,
  createTeamMember
);

// Admin only
router.post(
  "/create",
  isAuthenticated,
  upload.single("profileImage"),
  createTeamValidator,
  validate,
  createTeamMember
);
router.patch(
  "/:id",
  isAuthenticated,
  upload.single("profileImage"),
  updateTeamValidator,
  validate,
  updateTeamMember
);
router.delete("/:id", isAuthenticated, deleteTeamMember);

module.exports = router;
