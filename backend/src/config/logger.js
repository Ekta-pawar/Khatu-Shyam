const path = require("path");
const winston = require("winston");
require("winston-daily-rotate-file");

const logsDir = path.join(__dirname, "..", "..", "logs");

const isProduction = process.env.NODE_ENV === "production";

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `[${timestamp}] ${level}: ${stack || message}`;
  })
);

const transports = [
  new winston.transports.Console({
    format: consoleFormat,
    level: isProduction ? "info" : "debug",
  }),
  new winston.transports.DailyRotateFile({
    dirname: logsDir,
    filename: "error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    level: "error",
    maxFiles: "30d",
    maxSize: "20m",
  }),
  new winston.transports.DailyRotateFile({
    dirname: logsDir,
    filename: "combined-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d",
    maxSize: "20m",
  }),
];

const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  format: logFormat,
  transports,
  exitOnError: false,
});

logger.stream = {
  write: (message) => logger.info(message.trim()),
};

module.exports = logger;
