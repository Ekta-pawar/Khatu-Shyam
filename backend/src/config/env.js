const dotenv = require("dotenv");
dotenv.config();

const required = (key, fallback = undefined) => {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const toBool = (value, fallback = false) => {
  if (value === undefined) return fallback;
  return String(value).toLowerCase() === "true";
};

const toNumber = (value, fallback) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production";

const env = {
  NODE_ENV,
  isProduction,
  isDevelopment: NODE_ENV === "development",

  PORT: toNumber(process.env.PORT, 5000),
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",

  database: {
    uri: required("MONGO_URI"),
  },

  jwt: {
    secret: required("JWT_SECRET", isProduction ? undefined : "dev_jwt_secret_change_me"),
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    cookieExpiresInDays: toNumber(process.env.JWT_COOKIE_EXPIRES_IN_DAYS, 7),
  },

  cookie: {
    secure: toBool(process.env.COOKIE_SECURE, isProduction),
    sameSite: process.env.COOKIE_SAME_SITE || "none",
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
    folder: process.env.CLOUDINARY_FOLDER || "family-member-system",
  },

  mail: {
    host: process.env.MAIL_HOST || "",
    port: toNumber(process.env.MAIL_PORT, 587),
    user: process.env.MAIL_USER || "",
    pass: process.env.MAIL_PASS || "",
    from: process.env.MAIL_FROM || "no-reply@familymembersystem.com",
  },

  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || "",
    keySecret: process.env.RAZORPAY_KEY_SECRET || "",
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || "",
    enabled: toBool(process.env.RAZORPAY_ENABLED, false),
  },

  rateLimit: {
    windowMs: toNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    max: toNumber(process.env.RATE_LIMIT_MAX, 100),
    contactWindowMs: toNumber(process.env.CONTACT_RATE_LIMIT_WINDOW_MS, 60 * 60 * 1000),
    contactMax: toNumber(process.env.CONTACT_RATE_LIMIT_MAX, 5),
  },

  upload: {
    maxFileSizeMb: toNumber(process.env.MAX_FILE_SIZE_MB, 5),
    maxAdditionalImages: toNumber(process.env.MAX_ADDITIONAL_IMAGES, 10),
    maxFamilyImages: toNumber(process.env.MAX_FAMILY_IMAGES, 5),
  },

  superAdmin: {
    email: process.env.SUPER_ADMIN_EMAIL || "",
    password: process.env.SUPER_ADMIN_PASSWORD || "",
  },
};

module.exports = env;
