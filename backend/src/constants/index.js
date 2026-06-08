const ADMIN_ROLES = Object.freeze({
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
});

const GENDERS = Object.freeze(["male", "female", "other"]);

const BLOOD_GROUPS = Object.freeze(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]);

const PAYMENT_TYPES = Object.freeze({
  ONLINE: "online",
  OFFLINE: "offline",
});

const PAYMENT_STATUS = Object.freeze({
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
});

const PAYMENT_MODES = Object.freeze(["cash", "cheque", "bank_transfer", "upi", "card", "other"]);

const COOKIE_NAME = "token";

module.exports = {
  ADMIN_ROLES,
  GENDERS,
  BLOOD_GROUPS,
  PAYMENT_TYPES,
  PAYMENT_STATUS,
  PAYMENT_MODES,
  COOKIE_NAME,
};
