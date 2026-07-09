const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/auth.middleware");
const { createGalleryItem, getGalleryItems, deleteGalleryItem } = require("../controllers/gallery.controller");

// ================= GET GALLERY ITEMS (public) =================
router.get("/", getGalleryItems);

// ================= CREATE GALLERY ITEM (admin) =================
router.post("/create", isAuthenticated, createGalleryItem);

// ================= DELETE GALLERY ITEM (admin) =================
router.delete("/:id", isAuthenticated, deleteGalleryItem);

module.exports = router;
