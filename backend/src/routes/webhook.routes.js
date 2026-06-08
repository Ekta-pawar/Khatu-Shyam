const express = require("express");
const paymentController = require("../controllers/payment.controller");

const router = express.Router();

/**
 * Razorpay sends an HMAC signature computed over the raw request body, so this
 * route MUST receive the unparsed buffer — it is mounted in app.js BEFORE the
 * global express.json() middleware to guarantee that.
 */
router.post("/razorpay", express.raw({ type: "application/json" }), paymentController.razorpayWebhook);

module.exports = router;
