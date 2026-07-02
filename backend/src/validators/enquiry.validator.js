const { body } = require("express-validator");

const createEnquiryValidator = [
  body("contactPerson").trim().notEmpty().withMessage("Contact person is required").isLength({ max: 100 }),
  body("organisationName").trim().notEmpty().withMessage("Organisation name is required").isLength({ max: 150 }),
  body("phone").trim().notEmpty().withMessage("Phone number is required").isLength({ min: 10, max: 15 }),
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Provide a valid email"),
  body("amount").notEmpty().withMessage("Amount is required").isFloat({ min: 0 }).withMessage("Amount must be a valid number"),
  body("address").trim().notEmpty().withMessage("Address is required").isLength({ max: 250 }),
  body("message").optional({ checkFalsy: true }).trim().isLength({ max: 2000 }),
];

module.exports = { createEnquiryValidator };
