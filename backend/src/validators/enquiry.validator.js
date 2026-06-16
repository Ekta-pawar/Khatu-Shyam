const Joi = require("joi");

const enquirySchema = Joi.object({
  contactPerson: Joi.string().required(),
  organisationName: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  amount: Joi.number().required(),
  address: Joi.string().required(),
  message: Joi.string().allow(""),
});

module.exports = enquirySchema;