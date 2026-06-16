const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const sponsorController = require("../controllers/sponsor.controller");

router.post(
  "/create",
  upload.single("logo"),
  sponsorController.createSponsor
);

module.exports = router;






