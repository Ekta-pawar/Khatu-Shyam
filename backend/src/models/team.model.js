const mongoose = require("mongoose");
const { TEAM_TIERS } = require("../constants");

const teamSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    tier: {
      type: String,
      required: true,
      enum: TEAM_TIERS,
    },

    designation: String,

    phone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    profileImage: String,

    occupation: String,

    city: String,
    state: String,
    country: {
      type: String,
      default: "India",
    },

    additionalInfo: String,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Team || mongoose.model("Team", teamSchema);
