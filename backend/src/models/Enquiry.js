const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    contactPerson: String,
    organisationName: String,
    phone: String,
    email: String,
    amount: Number,
    address: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);