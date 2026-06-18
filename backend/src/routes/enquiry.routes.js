const express = require("express");
const router = express.Router();

const enquiryController = require("../controllers/enquiry.controller");

router.post("/create", enquiryController.createEnquiry);

module.exports = router;