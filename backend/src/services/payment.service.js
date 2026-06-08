const crypto = require("crypto");
const Payment = require("../models/payment.model");
const Member = require("../models/member.model");
const AppError = require("../utils/AppError");
const razorpayService = require("./razorpay.service");
const { PAYMENT_TYPES, PAYMENT_STATUS } = require("../constants");

const generateTransactionRef = () => `TXN-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

const assertMemberExists = async (memberId) => {
  const member = await Member.findById(memberId).select("_id firstName lastName");
  if (!member) throw new AppError("Member not found", 404);
  return member;
};

const recordPayment = async (payload, admin) => {
  await assertMemberExists(payload.member);

  const isOffline = payload.typeOfPayment === PAYMENT_TYPES.OFFLINE;

  const payment = await Payment.create({
    member: payload.member,
    amount: payload.amount,
    purpose: payload.purpose,
    typeOfPayment: payload.typeOfPayment,
    status: isOffline ? PAYMENT_STATUS.PAID : PAYMENT_STATUS.PENDING,
    offlineDetails: isOffline ? payload.offlineDetails : null,
    onlineDetails: isOffline ? null : {},
    transactionRef: generateTransactionRef(),
    createdBy: admin._id,
  });

  return payment;
};

/**
 * Future-ready entry point for online payments. While Razorpay credentials are
 * absent, this creates a 'pending' payment record and surfaces a clear 503 from
 * the razorpay service so the frontend can fall back to the offline flow.
 */
const initiateOnlinePayment = async (payload, admin) => {
  await assertMemberExists(payload.member);

  const transactionRef = generateTransactionRef();

  const payment = await Payment.create({
    member: payload.member,
    amount: payload.amount,
    purpose: payload.purpose,
    typeOfPayment: PAYMENT_TYPES.ONLINE,
    status: PAYMENT_STATUS.PENDING,
    onlineDetails: {},
    transactionRef,
    createdBy: admin._id,
  });

  try {
    const order = await razorpayService.createOrder({
      amount: payload.amount,
      receipt: transactionRef,
    });

    payment.onlineDetails.razorpayOrderId = order.id;
    await payment.save({ validateBeforeSave: false });

    return { payment, order };
  } catch (error) {
    // Keep the pending record for audit trail; surface the underlying reason (e.g. not configured yet)
    return { payment, order: null, error };
  }
};

const updateStatus = async (id, status, admin) => {
  const payment = await Payment.findById(id);
  if (!payment) throw new AppError("Payment not found", 404);

  payment.status = status;
  payment.updatedBy = admin._id;
  await payment.save();

  return payment;
};

/**
 * Webhook placeholder — wired to accept Razorpay's payload shape and verify
 * signatures once RAZORPAY_WEBHOOK_SECRET is configured. Until then it safely
 * acknowledges the request without mutating state.
 */
const handleWebhookEvent = async (rawBody, signatureHeader) => {
  const isValid = razorpayService.verifyWebhookSignature(rawBody, signatureHeader);
  if (!isValid) {
    throw new AppError("Invalid webhook signature", 400);
  }

  const event = JSON.parse(rawBody.toString("utf8"));
  const orderId = event?.payload?.payment?.entity?.order_id;

  if (!orderId) return null;

  const payment = await Payment.findOne({ "onlineDetails.razorpayOrderId": orderId });
  if (!payment) return null;

  payment.onlineDetails.razorpayPaymentId = event.payload.payment.entity.id;
  payment.onlineDetails.method = event.payload.payment.entity.method;
  payment.onlineDetails.webhookEvent = event.event;
  payment.onlineDetails.rawResponse = event;
  payment.status = event.event === "payment.captured" ? PAYMENT_STATUS.PAID : PAYMENT_STATUS.FAILED;

  await payment.save({ validateBeforeSave: false });
  return payment;
};

module.exports = { recordPayment, initiateOnlinePayment, updateStatus, handleWebhookEvent, generateTransactionRef };
