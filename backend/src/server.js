const app = require("./app");
const env = require("./config/env");
const logger = require("./config/logger");
const connectDB = require("./config/database");

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`, { stack: err.stack });
  process.exit(1);
});

const start = async () => {
  const isConnected = await connectDB();
  if (!isConnected) {
    logger.error("Exiting: could not establish a MongoDB connection");
    process.exit(1);
  }

  const server = app.listen(env.PORT, () => {
    logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });

  process.on("unhandledRejection", (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`, { stack: err.stack });
    server.close(() => process.exit(1));
  });

  process.on("SIGTERM", () => {
    logger.info("SIGTERM received. Shutting down gracefully");
    server.close(() => process.exit(0));
  });
};

start();
