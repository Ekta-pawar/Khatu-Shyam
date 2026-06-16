// const express = require("express");
// const memberController = require("../controllers/member.controller");
// const upload = require("../middleware/upload.middleware");
// const validate = require("../middleware/validate.middleware");
// const { isAuthenticated } = require("../middleware/auth.middleware");
// const {
//   parseJsonFields,
//   memberJsonFields,
//   createMemberValidator,
//   updateMemberValidator,
// } = require("../validators/member.validator");

// const router = express.Router();

// router.use(isAuthenticated);

// const memberFileFields = upload.fields([
//   { name: "profileImage", maxCount: 1 },
//   { name: "additionalImages", maxCount: 10 },
//   { name: "familyImages", maxCount: 5 },
// ]);

// router.post(
//   "/",
//   memberFileFields,
//   parseJsonFields(memberJsonFields),
//   createMemberValidator,
//   validate,
//   memberController.createMember
// );

// router.get("/", memberController.getMembers);
// router.get("/:id", memberController.getMemberById);

// router.patch(
//   "/:id",
//   memberFileFields,
//   parseJsonFields(memberJsonFields),
//   updateMemberValidator,
//   validate,
//   memberController.updateMember
// );

// router.delete("/:id", memberController.deleteMember);

// module.exports = router;
const express = require("express");
const router = express.Router();

const memberController = require("../controllers/member.controller");

router.post("/create", memberController.createMember);

module.exports = router;