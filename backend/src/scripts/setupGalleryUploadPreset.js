require("dotenv").config();
const cloudinary = require("../config/cloudinary");

const PRESET_NAME = "khatu_shyam_gallery_unsigned";

const presetConfig = {
  name: PRESET_NAME,
  unsigned: true,
  folder: "khatu-shyam/gallery",
  allowed_formats: "jpg,jpeg,png,webp,mp4,webm,mov",
  resource_type: "auto",
};

(async () => {
  try {
    await cloudinary.api.upload_preset(PRESET_NAME);
    await cloudinary.api.update_upload_preset(PRESET_NAME, presetConfig);
    console.log(`Upload preset "${PRESET_NAME}" already existed — settings refreshed.`);
  } catch (error) {
    if (error?.http_code === 404 || error?.error?.http_code === 404) {
      await cloudinary.api.create_upload_preset(presetConfig);
      console.log(`Upload preset "${PRESET_NAME}" created.`);
    } else {
      console.error("Failed to set up upload preset:", error?.message || error);
      process.exit(1);
    }
  }
})();
