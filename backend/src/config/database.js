const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 3000,
            socketTimeoutMS: 5000
        });
        console.log("✓ MongoDB connected successfully");
        return true;
    } catch (error) {
        console.log("⚠ MongoDB not available (development mode). Starting server without database.");
        return false;
    }
}

module.exports = connectDB;