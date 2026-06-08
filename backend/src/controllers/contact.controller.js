const Contact = require("../models/contact.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const AppError = require("../utils/AppError");

const submitContactMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const contact = await Contact.create({ name, email, phone, subject, message });

  return ApiResponse.success(res, {
    statusCode: 201,
    message: "Your message has been submitted. We will get back to you soon",
    data: { contact },
  });
});

const getContactMessages = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.isRead !== undefined) filter.isRead = req.query.isRead === "true";
  if (req.query.isResolved !== undefined) filter.isResolved = req.query.isResolved === "true";

  const [messages, total] = await Promise.all([
    Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Contact.countDocuments(filter),
  ]);

  return ApiResponse.success(res, {
    statusCode: 200,
    message: "Contact messages fetched successfully",
    data: { messages, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } },
  });
});

const getContactMessageById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) throw new AppError("Contact message not found", 404);

  if (!contact.isRead) {
    contact.isRead = true;
    await contact.save({ validateBeforeSave: false });
  }

  return ApiResponse.success(res, {
    statusCode: 200,
    message: "Contact message fetched successfully",
    data: { contact },
  });
});

const resolveContactMessage = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) throw new AppError("Contact message not found", 404);

  contact.isResolved = true;
  contact.respondedBy = req.admin._id;
  await contact.save({ validateBeforeSave: false });

  return ApiResponse.success(res, {
    statusCode: 200,
    message: "Contact message marked as resolved",
    data: { contact },
  });
});

const deleteContactMessage = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) throw new AppError("Contact message not found", 404);

  return ApiResponse.success(res, { statusCode: 200, message: "Contact message deleted successfully" });
});

module.exports = {
  submitContactMessage,
  getContactMessages,
  getContactMessageById,
  resolveContactMessage,
  deleteContactMessage,
};
