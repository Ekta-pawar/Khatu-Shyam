const Enquiry = require("../models/enquiry.models");


// Create Enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Create Enquiry Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Enquiries
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: enquiries,
      page: 1,
      total: enquiries.length,
      totalPages: 1,
    });
  } catch (error) {
    console.error("Get Enquiries Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Status
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Update Enquiry Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};