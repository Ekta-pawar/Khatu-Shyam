const Sponsor = require("../models/Sponsor");
const cloudinary = require("../config/cloudinary");

const REJECTION_GRACE_PERIOD_MS = 2 * 60 * 1000;

// In-memory map of sponsorId -> timeout handle. A rejected sponsor is
// deleted after a grace period unless its status changes before the
// timer fires. Lost on server restart by design (no persistence needed
// for a short-lived undo window).
const rejectionTimers = new Map();

const scheduleRejectionDeletion = (sponsorId) => {
  const existing = rejectionTimers.get(sponsorId);
  if (existing) clearTimeout(existing);

  const timer = setTimeout(async () => {
    rejectionTimers.delete(sponsorId);
    try {
      const sponsor = await Sponsor.findById(sponsorId);
      if (sponsor && sponsor.status === "rejected") {
        await Sponsor.findByIdAndDelete(sponsorId);
      }
    } catch (error) {
      console.error("Failed to auto-delete rejected sponsor:", error);
    }
  }, REJECTION_GRACE_PERIOD_MS);

  rejectionTimers.set(sponsorId, timer);
};

const cancelRejectionDeletion = (sponsorId) => {
  const existing = rejectionTimers.get(sponsorId);
  if (existing) {
    clearTimeout(existing);
    rejectionTimers.delete(sponsorId);
  }
};

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
// Public — excludes rejected sponsors so they disappear from the
// website as soon as an admin rejects them.
exports.getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find({ status: { $ne: "rejected" } }).sort({
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

// Admin — sees every sponsor regardless of status, including sponsors
// still in their post-rejection grace period before auto-deletion.
exports.getAllSponsorsAdmin = async (req, res) => {
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

exports.updateSponsorStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be one of: pending, approved, rejected",
      });
    }

    const sponsor = await Sponsor.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!sponsor) {
      return res.status(404).json({
        success: false,
        message: "Sponsor not found",
      });
    }

    if (status === "rejected") {
      scheduleRejectionDeletion(sponsor._id.toString());
    } else {
      cancelRejectionDeletion(sponsor._id.toString());
    }

    res.status(200).json({
      success: true,
      message: "Sponsor status updated successfully",
      data: sponsor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSponsorById = async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);

    if (!sponsor) {
      return res.status(404).json({
        success: false,
        message: "Sponsor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: sponsor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
