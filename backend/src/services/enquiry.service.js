const Enquiry = require("../models/enquiry.models");

const createEnquiry = async (data) => {
  return await Enquiry.create(data);
};

const getEnquiries = async ({ page = 1, limit = 20, search, status }) => {
  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (search) {
    const regex = new RegExp(search.trim(), "i");
    filter.$or = [
      { contactPerson: regex },
      { organisationName: regex },
      { phone: regex },
      { email: regex },
    ];
  }

  const skip = (page - 1) * limit;

  const [enquiries, total] = await Promise.all([
    Enquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Enquiry.countDocuments(filter),
  ]);

  return {
    enquiries,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getEnquiryById = async (id) => {
  return await Enquiry.findById(id);
};

const updateEnquiryStatus = async (id, status) => {
  return await Enquiry.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
};