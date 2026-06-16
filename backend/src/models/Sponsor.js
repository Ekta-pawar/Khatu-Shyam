const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema(
  {
    sponsorName: {
      type: String,
      required: true,
    },
    sponsorType: String,
    contactPerson: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    state: String,
    sponsorTier: String,
    eventType: String,
    customAmount: Number,
    message: String,
    gstin: String,
    website: String,
    panCard: String,

  logo: String,

  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sponsor", sponsorSchema);