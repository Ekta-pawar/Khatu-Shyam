const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const validate = require("../middleware/validate.middleware");
const { isAuthenticated, attachAdminIfPresent } = require("../middleware/auth.middleware");
const {
  parseJsonFields,
  memberJsonFields,
  createMemberValidator,
  updateMemberValidator,
} = require("../validators/member.validator");

const {
  createMember,
  updateMember,
  getMembers,
  getMemberById,
  getPillarMembers,
  deleteMember,
} = require("../controllers/member.controller");

// Public — used by the public website to display members/team.
// attachAdminIfPresent lets a logged-in admin (e.g. the admin panel calling
// these same endpoints) still get full member data; anonymous requests get
// the restricted public field set (see PUBLIC_MEMBER_FIELDS in the controller).
router.get("/", attachAdminIfPresent, getMembers);
router.get("/pillars", attachAdminIfPresent, getPillarMembers);
router.get("/:id", attachAdminIfPresent, getMemberById);

// Admin only
const memberFileFields = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "additionalImages", maxCount: 10 },
  { name: "familyImages", maxCount: 5 },
]);

router.post(
  "/create",
  isAuthenticated,
  memberFileFields,
  parseJsonFields(memberJsonFields),
  createMemberValidator,
  validate,
  createMember
);
router.patch(
  "/:id",
  isAuthenticated,
  memberFileFields,
  parseJsonFields(memberJsonFields),
  updateMemberValidator,
  validate,
  updateMember
);
router.delete("/:id", isAuthenticated, deleteMember);
module.exports = router;
