const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");
const env = require("../config/env");
const AppError = require("../utils/AppError");
const logger = require("../config/logger");

const uploadBufferToCloudinary = (buffer, { folder, publicId } = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder ? `${env.cloudinary.folder}/${folder}` : env.cloudinary.folder,
        public_id: publicId,
        resource_type: "image",
        transformation: [{ width: 1200, height: 1200, crop: "limit", quality: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

const uploadImage = async (file, folder) => {
  if (!file) return null;

  try {
    const result = await uploadBufferToCloudinary(file.buffer, { folder });
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    logger.error(`Cloudinary upload failed: ${error.message}`);
    throw new AppError("Image upload failed. Please try again", 502);
  }
};

const uploadImages = async (files = [], folder) => {
  if (!files || files.length === 0) return [];
  return Promise.all(files.map((file) => uploadImage(file, folder)));
};

const deleteImage = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    logger.warn(`Cloudinary delete failed for ${publicId}: ${error.message}`);
  }
};

module.exports = { uploadImage, uploadImages, deleteImage };
