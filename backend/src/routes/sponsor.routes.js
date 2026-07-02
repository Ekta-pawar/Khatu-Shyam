const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload.middleware");
const sponsorController = require("../controllers/sponsor.controller");
const validate = require("../middleware/validate.middleware");
const { createSponsorValidator } = require("../validators/sponsor.validator");

// Public — submitted from the website's sponsor signup form
router.post(
  "/create",
  upload.single("logo"),
  createSponsorValidator,
  validate,
  sponsorController.createSponsor
);

router.get("/", sponsorController.getAllSponsors);

module.exports = router;