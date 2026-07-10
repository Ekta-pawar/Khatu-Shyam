const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload.middleware");
const sponsorController = require("../controllers/sponsor.controller");
const validate = require("../middleware/validate.middleware");
const { createSponsorValidator } = require("../validators/sponsor.validator");
const { isAuthenticated } = require("../middleware/auth.middleware");

// Public — submitted from the website's sponsor signup form
router.post(
  "/create",
  upload.single("logo"),
  createSponsorValidator,
  validate,
  sponsorController.createSponsor
);

// Admin — every sponsor regardless of status (must come before "/:id")
router.get("/admin", isAuthenticated, sponsorController.getAllSponsorsAdmin);

router.patch("/:id/status", isAuthenticated, sponsorController.updateSponsorStatus);

router.get("/", sponsorController.getAllSponsors);

router.get("/:id", sponsorController.getSponsorById);

module.exports = router;