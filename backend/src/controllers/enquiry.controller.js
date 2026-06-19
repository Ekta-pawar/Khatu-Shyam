// const asyncHandler = require("../utils/asyncHandler");
// const ApiResponse = require("../utils/ApiResponse");
// const AppError = require("../utils/AppError");
// const enquiryService = require("../services/enquiry.service");

// const createEnquiry = asyncHandler(async (req, res) => {
//   const enquiry = await enquiryService.createEnquiry(req.body);

//   return ApiResponse.success(res, {
//     statusCode: 201,
//     message: "Enquiry submitted successfully",
//     data: { enquiry },
//   });
// });

// const getEnquiries = asyncHandler(async (req, res) => {
//   const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
//   const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
//   const { search, status } = req.query;

//   const result = await enquiryService.getEnquiries({ page, limit, search, status });

//   return ApiResponse.success(res, {
//     statusCode: 200,
//     message: "Enquiries fetched successfully",
//     data: result,
//   });
// });

// const updateEnquiryStatus = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!["pending", "resolved", "rejected"].includes(status)) {
//     throw new AppError("Invalid enquiry status", 400);
//   }

//   const enquiry = await enquiryService.updateEnquiryStatus(id, status);
//   if (!enquiry) {
//     throw new AppError("Enquiry not found", 404);
//   }

//   return ApiResponse.success(res, {
//     statusCode: 200,
//     message: "Enquiry status updated successfully",
//     data: { enquiry },
//   });
// });

// module.exports = {
//   createEnquiry,
//   getEnquiries,
//   updateEnquiryStatus,
// };
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