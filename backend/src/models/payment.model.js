const mongoose = require("mongoose");
const { PAYMENT_TYPES, PAYMENT_STATUS, PAYMENT_MODES } = require("../constants");

/* Filled in manually by an admin when typeOfPayment === 'offline' */
const offlineDetailsSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true, min: 0 },
    paymentDate: { type: Date, required: true },
    paymentMode: { type: String, enum: PAYMENT_MODES, required: true },
    referenceNumber: { type: String, trim: true },
    collectedBy: { type: String, trim: true, required: true },
    note: { type: String, trim: true, maxlength: 500 },
  },
  { _id: false }
);

/* Populated once Razorpay is wired up; structure mirrors Razorpay's order/payment objects */
const onlineDetailsSchema = new mongoose.Schema(
  {
    razorpayOrderId: { type: String, trim: true, default: "" },
    razorpayPaymentId: { type: String, trim: true, default: "" },
    razorpaySignature: { type: String, trim: true, default: "" },
    currency: { type: String, trim: true, default: "INR" },
    method: { type: String, trim: true, default: "" },
    webhookEvent: { type: String, trim: true, default: "" },
    rawResponse: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { _id: false }
);

const paymentSchema = new mongoose.Schema(
  {
    member: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    purpose: { type: String, trim: true, maxlength: 200, default: "Membership contribution" },

    typeOfPayment: { type: String, enum: Object.values(PAYMENT_TYPES), required: true },
    status: { type: String, enum: Object.values(PAYMENT_STATUS), default: PAYMENT_STATUS.PENDING },

    offlineDetails: { type: offlineDetailsSchema, default: null },
    onlineDetails: { type: onlineDetailsSchema, default: null },

    transactionRef: { type: String, trim: true, unique: true, sparse: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
  },
  { timestamps: true }
);

paymentSchema.index({ member: 1, status: 1 });
paymentSchema.index({ createdAt: -1 });

paymentSchema.pre("validate", function enforceTypeSpecificDetails(next) {
  if (this.typeOfPayment === PAYMENT_TYPES.OFFLINE && !this.offlineDetails) {
    return next(new Error("offlineDetails is required when typeOfPayment is 'offline'"));
  }
  next();
});

// Explicit collection name: this database is shared with another application
// that already has an unrelated 'payments' collection with a different schema.
const Payment = mongoose.model("Payment", paymentSchema, "family_payments");

module.exports = Payment;
