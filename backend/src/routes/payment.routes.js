const express = require("express");
const paymentController = require("../controllers/payment.controller");
const validate = require("../middleware/validate.middleware");
const { isAuthenticated } = require("../middleware/auth.middleware");
const {
  createPaymentValidator,
  updatePaymentStatusValidator,
  createOnlineOrderValidator,
} = require("../validators/payment.validator");

const router = express.Router();

router.use(isAuthenticated);

router.post("/", createPaymentValidator, validate, paymentController.createPayment);
router.post("/online/order", createOnlineOrderValidator, validate, paymentController.createOnlineOrder);

router.get("/", paymentController.getPayments);
router.get("/:id", paymentController.getPaymentById);
router.patch("/:id/status", updatePaymentStatusValidator, validate, paymentController.updatePaymentStatus);

module.exports = router;
