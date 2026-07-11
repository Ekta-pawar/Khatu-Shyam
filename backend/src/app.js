const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
// const enquiryRoutes = require("./routes/enquiry.routes");
const sponsorRoutes = require("./routes/sponsor.routes");

const eventRoutes = require("./routes/event.routes");
const galleryRoutes = require("./routes/gallery.routes");

const env = require("./config/env");
const logger = require("./config/logger");
const routes = require("./routes");
const webhookRoutes = require("./routes/webhook.routes");
const sanitizeRequest = require("./middleware/sanitize.middleware");
const { notFound, globalErrorHandler } = require("./middleware/error.middleware");
const { apiLimiter } = require("./middleware/rateLimiter.middleware");
const dashboardRoutes = require("./routes/dashboard.routes");
const enquiryRoutes = require("./routes/enquiry.routes");
const teamRoutes = require("./routes/team.routes");


const app = express();






app.set("trust proxy", 1);
require("dotenv").config();
/* ------------------------------------------------------------------ */
/* Security                                                             */
/* ------------------------------------------------------------------ */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  })
);
// Vite dev servers grab whichever port is free (5173, 5174, ...) depending on
// what else is running locally, so in development we allow any localhost/
// 127.0.0.1 origin rather than hardcoding one port. Production stays locked
// to FRONTEND_URL.
const isLocalDevOrigin = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (origin === env.FRONTEND_URL) return callback(null, true);
      if (env.isDevelopment && isLocalDevOrigin(origin)) return callback(null, true);
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);
app.options(/.*/, cors());
app.use(compression());
app.disable("etag");
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
  }
  next();
});

/* ------------------------------------------------------------------ */
/* Webhooks need the raw request body for signature verification, so   */
/* this is mounted BEFORE the JSON body parser below.                  */
/* ------------------------------------------------------------------ */
app.use("/api/v1/webhooks", webhookRoutes);

/* ------------------------------------------------------------------ */
/* Body parsing & sanitization                                         */
/* ------------------------------------------------------------------ */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(sanitizeRequest);

/* ------------------------------------------------------------------ */
/* Logging                                                             */
/* ------------------------------------------------------------------ */
const morganFormat = env.isProduction ? "combined" : "dev";
app.use(morgan(morganFormat, { stream: logger.stream }));

/* ------------------------------------------------------------------ */
/* Rate limiting (general API)                                         */
/* ------------------------------------------------------------------ */
app.use("/api", apiLimiter);

/* ------------------------------------------------------------------ */
/* Routes                                                              */
/* ------------------------------------------------------------------ */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Family Member Management System API is running",
    data: { environment: env.NODE_ENV },
    errors: [],
  });
});

app.use("/api/v1", routes);

app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/enquiry", enquiryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/v1/sponsor", sponsorRoutes);
app.use("/api/v1/gallery", galleryRoutes);
app.use("/api/v1/team", teamRoutes);

/* ------------------------------------------------------------------ */
/* Error handling                                                      */
/* ------------------------------------------------------------------ */
app.use(notFound);
app.use(globalErrorHandler);

module.exports = app;


 