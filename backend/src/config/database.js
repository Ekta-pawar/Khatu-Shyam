const mongoose = require("mongoose");
const env = require("./env");
const logger = require("./logger");

const connectDB = async () => {
  try {
    await mongoose.connect(env.database.uri, {
      serverSelectionTimeoutMS: 5000,
    });
    logger.info("MongoDB connected successfully");
    return true;
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error.message}`);
    return false;
  }
};

module.exports = connectDB;
