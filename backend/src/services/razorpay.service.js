const crypto = require("crypto");
const env = require("../config/env");
const AppError = require("../utils/AppError");
const logger = require("../config/logger");

/**
 * Razorpay is not yet active in this deployment (env.razorpay.enabled === false).
 * This module isolates all Razorpay-specific logic so that flipping the flag
 * and supplying real keys is the only change needed to go live — no controller
 * or route code needs to change.
 *
 * To activate: `npm install razorpay`, set RAZORPAY_ENABLED=true and the
 * RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET / RAZORPAY_WEBHOOK_SECRET env vars,
 * then replace the bodies below with real `razorpay` SDK calls.
 */

const ensureEnabled = () => {
  if (!env.razorpay.enabled) {
    throw new AppError("Online payments are not enabled yet. Please use offline payment for now", 503);
  }
};

const createOrder = async ({ amount, currency = "INR", receipt }) => {
  ensureEnabled();

  // const Razorpay = require("razorpay");
  // const instance = new Razorpay({ key_id: env.razorpay.keyId, key_secret: env.razorpay.keySecret });
  // return instance.orders.create({ amount: Math.round(amount * 100), currency, receipt });

  logger.info(`[razorpay:placeholder] createOrder called for receipt=${receipt} amount=${amount}`);
  throw new AppError("Razorpay integration is not configured yet", 503);
};

const verifyPaymentSignature = ({ orderId, paymentId, signature }) => {
  ensureEnabled();

  const expectedSignature = crypto
    .createHmac("sha256", env.razorpay.keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return expectedSignature === signature;
};

const verifyWebhookSignature = (rawBody, signatureHeader) => {
  ensureEnabled();

  const expectedSignature = crypto
    .createHmac("sha256", env.razorpay.webhookSecret)
    .update(rawBody)
    .digest("hex");

  return expectedSignature === signatureHeader;
};

module.exports = { ensureEnabled, createOrder, verifyPaymentSignature, verifyWebhookSignature };
