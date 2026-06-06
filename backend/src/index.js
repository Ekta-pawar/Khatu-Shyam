const express = require("express"); 
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/database");

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Start server regardless of database connection
connectDB().then((connected) => {
  if (connected) {
    console.log("Database connection established");
  }
  
  app.listen(port, () => {
    console.log(`✓ Server is running on port ${port}`);
  });
}).catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
