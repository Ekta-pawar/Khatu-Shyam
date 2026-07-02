const Sponsor = require("../models/Sponsor");
const cloudinary = require("../config/cloudinary");

exports.createSponsor = async (req, res) => {
  try {
    let logoUrl = "";

    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`;

      const uploadedImage = await cloudinary.uploader.upload(base64Image, {
        folder: "sponsors",
      });

      logoUrl = uploadedImage.secure_url;
    }

    const sponsor = await Sponsor.create({
      ...req.body,
      logo: logoUrl,
    });

    res.status(201).json({
      success: true,
      message: "Sponsor created successfully",
      data: sponsor,
    });
  } catch (error) {
    console.error("Sponsor creation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create sponsor",
    });
  }
};
exports.getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: sponsors,
      total: sponsors.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};