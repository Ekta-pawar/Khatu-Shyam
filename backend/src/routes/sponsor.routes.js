const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const sponsorController = require("../controllers/sponsor.controller");

router.post(
  "/create",
  upload.single("logo"),
  sponsorController.createSponsor
);

router.get("/", sponsorController.getAllSponsors);

module.exports = router;