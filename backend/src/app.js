const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const env = require("./config/env");
const logger = require("./config/logger");
const routes = require("./routes");
const webhookRoutes = require("./routes/webhook.routes");
const sanitizeRequest = require("./middleware/sanitize.middleware");
const { notFound, globalErrorHandler } = require("./middleware/error.middleware");
const { apiLimiter } = require("./middleware/rateLimiter.middleware");

const app = express();

app.set("trust proxy", 1);

/* ------------------------------------------------------------------ */
/* Security                                                             */
/* ------------------------------------------------------------------ */
app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(compression());

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

/* ------------------------------------------------------------------ */
/* Error handling                                                      */
/* ------------------------------------------------------------------ */
app.use(notFound);
app.use(globalErrorHandler);

module.exports = app;
