const AppError = require("../utils/AppError");
const ApiResponse = require("../utils/ApiResponse");
const logger = require("../config/logger");
const env = require("../config/env");

const handleCastErrorDB = (err) =>
  new AppError(`Invalid value for field '${err.path}': ${err.value}`, 400);

const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue || {})[0];
  const value = err.keyValue ? err.keyValue[field] : "";
  return new AppError(`Duplicate value '${value}' for field '${field}'. Please use another value`, 409);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new AppError("Invalid input data", 400, errors);
};

const handleJWTError = () => new AppError("Invalid token. Please log in again", 401);
const handleJWTExpiredError = () => new AppError("Your session has expired. Please log in again", 401);

const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

const globalErrorHandler = (err, req, res, next) => {
  let error = err;
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (error.name === "CastError") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === "ValidationError") error = handleValidationErrorDB(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

  if (error.statusCode >= 500) {
    logger.error(`${req.method} ${req.originalUrl} - ${error.message}`, { stack: error.stack });
  } else {
    logger.warn(`${req.method} ${req.originalUrl} - ${error.message}`);
  }

  return ApiResponse.error(res, {
    statusCode: error.statusCode,
    message: error.message || "Internal Server Error",
    errors: error.errors && error.errors.length ? error.errors : env.isProduction && error.statusCode >= 500 ? [] : [error.message],
  });
};

module.exports = { notFound, globalErrorHandler };
