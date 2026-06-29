// const Member = require("../models/member.model");
// const asyncHandler = require("../utils/asyncHandler");
// const ApiResponse = require("../utils/ApiResponse");
// const AppError = require("../utils/AppError");
// const memberService = require("../services/member.service");

// const createMember = asyncHandler(async (req, res) => {
//   const member = await memberService.createMember(req.body, req.files || {}, req.admin);

//   return ApiResponse.success(res, {
//     statusCode: 201,
//     message: "Member created successfully",
//     data: { member },
//   });
// });

// const getMembers = asyncHandler(async (req, res) => {
//   const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
//   const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
//   const skip = (page - 1) * limit;

//   const filter = memberService.buildSearchQuery(req.query);

//   const [members, total] = await Promise.all([
//     Member.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
//     Member.countDocuments(filter),
//   ]);

//   return ApiResponse.success(res, {
//     statusCode: 200,
//     message: "Members fetched successfully",
//     data: {
//       members,
//       pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
//     },
//   });
// });

// const getMemberById = asyncHandler(async (req, res) => {
//   const member = await Member.findById(req.params.id)
//     .populate("createdBy", "firstName lastName email")
//     .populate("updatedBy", "firstName lastName email");

//   if (!member) throw new AppError("Member not found", 404);

//   return ApiResponse.success(res, {
//     statusCode: 200,
//     message: "Member fetched successfully",
//     data: { member },
//   });
// });

// const updateMember = asyncHandler(async (req, res) => {
//   const member = await memberService.updateMember(req.params.id, req.body, req.files || {}, req.admin);

//   return ApiResponse.success(res, {
//     statusCode: 200,
//     message: "Member updated successfully",
//     data: { member },
//   });
// });

// const deleteMember = asyncHandler(async (req, res) => {
//   await memberService.deleteMember(req.params.id);

//   return ApiResponse.success(res, {
//     statusCode: 200,
//     message: "Member deleted successfully",
//   });
// });

// module.exports = { createMember, getMembers, getMemberById, updateMember, deleteMember };
const Member = require("../models/member.model");
const cloudinary = require("../config/cloudinary");

const JSON_FIELDS = [
  "jobDetails",
  "businessDetails",
  "familyMembers",
  "anniversaries",
  "customDates",
  "specialDates",
  "familyDetails",
];

exports.createMember = async (req, res) => {
  try {
    const data = { ...req.body };

    for (const field of JSON_FIELDS) {
      if (typeof data[field] === "string" && data[field]) {
        data[field] = JSON.parse(data[field]);
      }
    }

    if (typeof data.hasBusiness === "string") data.hasBusiness = data.hasBusiness === "true";
    if (typeof data.hasJob === "string") data.hasJob = data.hasJob === "true";

    if (!data.fullName && (data.firstName || data.lastName)) {
      data.fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
    }

    if (data.specialDates) {
      if (data.specialDates.anniversaries?.length) data.anniversaries = data.specialDates.anniversaries;
      if (data.specialDates.customDates?.length) data.customDates = data.specialDates.customDates;
      delete data.specialDates;
    }

    if (data.familyDetails?.members?.length) {
      data.familyMembers = data.familyDetails.members;
      delete data.familyDetails;
    }

    const existing = await Member.findOne({ phone: data.phone });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Member with this phone number already exists",
      });
    }

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "khatu-shyam/members",
      });
      data.profileImage = result.secure_url;
    }

    const member = await Member.create(data);

    res.status(201).json({
      success: true,
      member,
    });
  } catch (error) {
    console.error("CREATE MEMBER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// exports.getMembers = async (req, res) => {
//   try {
//     console.log("Query Params:", req.query);

//     const members = await Member.find();

//     res.status(200).json({
//       success: true,
//       members,
//     });
//   } catch (error) {
//     console.error("GET MEMBERS ERROR:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      members,
      data: members,
    });
  } catch (error) {
    console.error("GET MEMBERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(
      req.params.id
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      member,
      data: member,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPillarMembers = async (req, res) => {
  try {
    const members = await Member.find({ tier: "Samiti Pillar" })
      .sort({ createdAt: -1 })
      .limit(12);

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

