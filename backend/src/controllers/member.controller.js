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

exports.createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);

    res.status(201).json({
      success: true,
      member,
    });
  } catch (error) {
  console.error("GET MEMBERS ERROR:");
  console.error(error);

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
  
