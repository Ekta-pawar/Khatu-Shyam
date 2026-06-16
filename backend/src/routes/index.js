const express = require("express");
const adminRoutes = require("./admin.routes");
const memberRoutes = require("./member.routes");
const paymentRoutes = require("./payment.routes");
const contactRoutes = require("./contact.routes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is healthy", data: { uptime: process.uptime() }, errors: [] });
});

router.use("/admins", adminRoutes);
router.use("/members", memberRoutes);
router.use("/payments", paymentRoutes);
router.use("/contacts", contactRoutes);





module.exports = router;
