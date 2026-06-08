const rateLimit = require("express-rate-limit");
const env = require("../config/env");

const apiLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later",
    data: {},
    errors: [],
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later",
    data: {},
    errors: [],
  },
});

const contactLimiter = rateLimit({
  windowMs: env.rateLimit.contactWindowMs,
  max: env.rateLimit.contactMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages submitted. Please try again later",
    data: {},
    errors: [],
  },
});

module.exports = { apiLimiter, authLimiter, contactLimiter };
