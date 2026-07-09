const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["photo", "video", "guest"],
      required: true,
    },

    // Only meaningful for type "photo" — controls which tab it shows under
    // on the public Photo Album page.
    category: {
      type: String,
      enum: ["highlight", "album"],
      default: "album",
    },

    title: {
      type: String,
      trim: true,
    },

    guestName: {
      type: String,
      trim: true,
    },

    eventDate: {
      type: Date,
    },

    mediaUrl: {
      type: String,
      required: true,
    },

    mediaType: {
      type: String,
    },

    publicId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);
