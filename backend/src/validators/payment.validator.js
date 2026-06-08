const { body } = require("express-validator");
const { PAYMENT_TYPES, PAYMENT_MODES, PAYMENT_STATUS } = require("../constants");

const createPaymentValidator = [
  body("member").trim().notEmpty().withMessage("Member id is required").isMongoId().withMessage("Member id must be a valid id"),
  body("amount").notEmpty().withMessage("Amount is required").isFloat({ gt: 0 }).withMessage("Amount must be greater than 0"),
  body("purpose").optional({ checkFalsy: true }).trim().isLength({ max: 200 }),
  body("typeOfPayment")
    .trim()
    .notEmpty()
    .withMessage("typeOfPayment is required")
    .isIn(Object.values(PAYMENT_TYPES))
    .withMessage(`typeOfPayment must be one of: ${Object.values(PAYMENT_TYPES).join(", ")}`),

  body("offlineDetails")
    .if(body("typeOfPayment").equals(PAYMENT_TYPES.OFFLINE))
    .notEmpty()
    .withMessage("offlineDetails is required for offline payments")
    .bail()
    .isObject(),
  body("offlineDetails.amount")
    .if(body("typeOfPayment").equals(PAYMENT_TYPES.OFFLINE))
    .notEmpty().withMessage("offlineDetails.amount is required")
    .isFloat({ gt: 0 }),
  body("offlineDetails.paymentDate")
    .if(body("typeOfPayment").equals(PAYMENT_TYPES.OFFLINE))
    .notEmpty().withMessage("offlineDetails.paymentDate is required")
    .isISO8601().withMessage("offlineDetails.paymentDate must be a valid date"),
  body("offlineDetails.paymentMode")
    .if(body("typeOfPayment").equals(PAYMENT_TYPES.OFFLINE))
    .notEmpty().withMessage("offlineDetails.paymentMode is required")
    .isIn(PAYMENT_MODES).withMessage(`paymentMode must be one of: ${PAYMENT_MODES.join(", ")}`),
  body("offlineDetails.collectedBy")
    .if(body("typeOfPayment").equals(PAYMENT_TYPES.OFFLINE))
    .trim().notEmpty().withMessage("offlineDetails.collectedBy is required"),
];

const updatePaymentStatusValidator = [
  body("status")
    .trim()
    .notEmpty()
    .withMessage("status is required")
    .isIn(Object.values(PAYMENT_STATUS))
    .withMessage(`status must be one of: ${Object.values(PAYMENT_STATUS).join(", ")}`),
];

const createOnlineOrderValidator = [
  body("member").trim().notEmpty().withMessage("Member id is required").isMongoId(),
  body("amount").notEmpty().withMessage("Amount is required").isFloat({ gt: 0 }),
  body("purpose").optional({ checkFalsy: true }).trim().isLength({ max: 200 }),
];

module.exports = { createPaymentValidator, updatePaymentStatusValidator, createOnlineOrderValidator };
