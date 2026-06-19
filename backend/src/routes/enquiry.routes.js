const express = require("express");
const router = express.Router();

const enquiryController = require("../controllers/enquiry.controller");

// Create enquiry
router.post("/create", enquiryController.createEnquiry);

// Get all enquiries
router.get("/", enquiryController.getEnquiries);

// Update status
router.patch("/:id/status", enquiryController.updateEnquiryStatus);

module.exports = router;