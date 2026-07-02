const express = require("express");
const router = express.Router();

const enquiryController = require("../controllers/enquiry.controller");
const { isAuthenticated } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { createEnquiryValidator } = require("../validators/enquiry.validator");

// Public — submitted from the website's enquiry/sponsor form
router.post("/create", createEnquiryValidator, validate, enquiryController.createEnquiry);

// Admin only
router.get("/", isAuthenticated, enquiryController.getEnquiries);
router.patch("/:id/status", isAuthenticated, enquiryController.updateEnquiryStatus);

module.exports = router;