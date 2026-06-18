const express = require("express");
const router = express.Router();

router.get("/stats", (req, res) => {
  res.json({
    success: true,
    message: "Dashboard route working",
  });
});

module.exports = router;