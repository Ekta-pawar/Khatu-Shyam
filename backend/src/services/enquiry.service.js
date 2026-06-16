const Enquiry = require("../models/Enquiry");

const createEnquiry = async (data) => {
  return await Enquiry.create(data);
};

module.exports = {
  createEnquiry,
};