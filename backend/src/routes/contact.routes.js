const express = require("express");
const contactController = require("../controllers/contact.controller");
const validate = require("../middleware/validate.middleware");
const { isAuthenticated } = require("../middleware/auth.middleware");
const { contactLimiter } = require("../middleware/rateLimiter.middleware");
const { createContactValidator } = require("../validators/contact.validator");

const router = express.Router();

// Public — submitted from the website's contact form
router.post("/", contactLimiter, createContactValidator, validate, contactController.submitContactMessage);

// Admin only
router.get("/", isAuthenticated, contactController.getContactMessages);
router.get("/:id", isAuthenticated, contactController.getContactMessageById);
router.patch("/:id/resolve", isAuthenticated, contactController.resolveContactMessage);
router.delete("/:id", isAuthenticated, contactController.deleteContactMessage);

module.exports = router;
