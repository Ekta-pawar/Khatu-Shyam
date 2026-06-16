const Sponsor = require("../models/Sponsor");
const cloudinary = require("../config/cloudinary");


exports.createSponsor = async (req, res) => {
  try {
    let logoUrl = "";

    console.log("========== CREATE SPONSOR ==========");
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE EXISTS:", !!req.file);

    console.log("Cloudinary Config:");
    console.log("CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API_KEY:", process.env.CLOUDINARY_API_KEY);
    console.log(
      "API_SECRET EXISTS:",
      !!process.env.CLOUDINARY_API_SECRET
    );

    if (req.file) {
      console.log("Starting Cloudinary upload...");

      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`;

      console.log("Image size:", req.file.size);
      console.log("Mime type:", req.file.mimetype);

      const uploadedImage = await cloudinary.uploader.upload(base64Image, {
        folder: "sponsors",
      });

      console.log("Cloudinary Upload Success:");
      console.log(uploadedImage);

      logoUrl = uploadedImage.secure_url;
    }

    console.log("Creating sponsor in DB...");

    const sponsor = await Sponsor.create({
      ...req.body,
      logo: logoUrl,
    });

    console.log("Sponsor Created:", sponsor._id);

    res.status(201).json({
      success: true,
      message: "Sponsor created successfully",
      data: sponsor,
    });
  } catch (error) {
    console.error("========== SPONSOR ERROR ==========");
    console.error("Message:", error.message);
    console.error("Name:", error.name);
    console.error("HTTP Code:", error.http_code);
    console.error("Full Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

// exports.createSponsor = async (req, res) => {
//   try {
//     let logoUrl = "";

//     console.log("REQ.BODY:", req.body);
//     console.log("REQ.FILE:", req.file);

//     // Upload image to Cloudinary
//     if (req.file) {
//       const uploadedImage = await cloudinary.uploader.upload(
//         `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
//         {
//           folder: "sponsors",
//         }
//       );

//       logoUrl = uploadedImage.secure_url;
//     }

//     // Save sponsor data in MongoDB
//     const sponsor = await Sponsor.create({
//       ...req.body,
//       logo: logoUrl,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Sponsor created successfully",
//       data: sponsor,
//     });
//   } catch (error) {
//     console.error("Sponsor Error:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };