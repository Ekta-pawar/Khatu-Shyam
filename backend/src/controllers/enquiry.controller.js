const enquiryService = require("../services/enquiry.service");

const createEnquiry = async (req, res) => {
  try {
    const enquiry = await enquiryService.createEnquiry(req.body);

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEnquiry,
};