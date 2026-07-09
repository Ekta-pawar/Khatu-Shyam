const Gallery = require("../models/gallery.model");
const cloudinary = require("../config/cloudinary");

// ========================= CREATE GALLERY ITEM =========================
// The file itself is uploaded straight from the browser to Cloudinary
// (unsigned preset) — this just persists the resulting media metadata.

const createGalleryItem = async (req, res) => {
  try {
    const { type, title, guestName, eventDate, category, mediaUrl, mediaType, publicId } = req.body;

    if (!type || !mediaUrl) {
      return res.status(400).json({
        success: false,
        message: "type and mediaUrl are required",
      });
    }

    const item = await Gallery.create({
      type,
      title,
      guestName,
      eventDate: eventDate || undefined,
      category: type === "photo" ? category || "album" : undefined,
      mediaUrl,
      mediaType,
      publicId,
    });

    res.status(201).json({
      success: true,
      message: "Gallery item created successfully",
      data: item,
    });
  } catch (error) {
    console.error("Create gallery item error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================= GET GALLERY ITEMS =========================

const getGalleryItems = async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;

    const items = await Gallery.find(filter).sort({ eventDate: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================= DELETE GALLERY ITEM =========================

const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    if (item.publicId) {
      try {
        await cloudinary.uploader.destroy(item.publicId, {
          resource_type: item.mediaType === "video" ? "video" : "image",
        });
      } catch (cloudErr) {
        console.error("Cloudinary delete failed:", cloudErr.message);
      }
    }

    res.status(200).json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createGalleryItem,
  getGalleryItems,
  deleteGalleryItem,
};
