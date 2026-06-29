const multer = require("multer");
const env = require("../config/env");

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(
      new Error(`Unsupported file type: ${file.mimetype}. Allowed: jpeg, png, webp`),
      false
    );
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: (env.upload.maxFileSizeMb || 5) * 1024 * 1024,
  },
});

module.exports = upload;
