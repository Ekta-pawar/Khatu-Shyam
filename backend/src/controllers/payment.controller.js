const Payment = require("../models/payment.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const AppError = require("../utils/AppError");
const paymentService = require("../services/payment.service");

const createPayment = asyncHandler(async (req, res) => {
  const payment = await paymentService.recordPayment(req.body, req.admin);

  return ApiResponse.success(res, {
    statusCode: 201,
    message: "Payment recorded successfully",
    data: { payment },
  });
});

/**
 * Creates a 'pending' payment + (when configured) a Razorpay order.
 * Until Razorpay credentials are added, returns 503 with the pending
 * record id so the UI can show "online payments coming soon".
 */
const createOnlineOrder = asyncHandler(async (req, res) => {
  const { payment, order, error } = await paymentService.initiateOnlinePayment(req.body, req.admin);

  if (!order) {
    return ApiResponse.error(res, {
      statusCode: 503,
      message: error?.message || "Online payments are not available yet. Please record an offline payment",
      errors: [{ paymentId: payment._id, transactionRef: payment.transactionRef }],
    });
  }

  return ApiResponse.success(res, {
    statusCode: 201,
    message: "Razorpay order created successfully",
    data: { payment, order },
  });
});

const razorpayWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];
  await paymentService.handleWebhookEvent(req.body, signature);

  return res.status(200).json({ received: true });
});

const getPayments = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.member) filter.member = req.query.member;
  if (req.query.status) filter.status = req.query.status;
  if (req.query.typeOfPayment) filter.typeOfPayment = req.query.typeOfPayment;

  const [payments, total] = await Promise.all([
    Payment.find(filter)
      .populate("member", "firstName lastName phone")
      .populate("createdBy", "firstName lastName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Payment.countDocuments(filter),
  ]);

  return ApiResponse.success(res, {
    statusCode: 200,
    message: "Payments fetched successfully",
    data: { payments, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } },
  });
});

const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id)
    .populate("member", "firstName lastName phone email")
    .populate("createdBy", "firstName lastName")
    .populate("updatedBy", "firstName lastName");

  if (!payment) throw new AppError("Payment not found", 404);

  return ApiResponse.success(res, {
    statusCode: 200,
    message: "Payment fetched successfully",
    data: { payment },
  });
});

const updatePaymentStatus = asyncHandler(async (req, res) => {
  const payment = await paymentService.updateStatus(req.params.id, req.body.status, req.admin);

  return ApiResponse.success(res, {
    statusCode: 200,
    message: "Payment status updated successfully",
    data: { payment },
  });
});

module.exports = {
  createPayment,
  createOnlineOrder,
  razorpayWebhook,
  getPayments,
  getPaymentById,
  updatePaymentStatus,
};
