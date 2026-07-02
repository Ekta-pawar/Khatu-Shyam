const { body } = require("express-validator");

const createSponsorValidator = [
  body("sponsorName").trim().notEmpty().withMessage("Sponsor/organization name is required").isLength({ max: 150 }),
  body("sponsorType").trim().notEmpty().withMessage("Sponsor type is required"),
  body("contactPerson").trim().notEmpty().withMessage("Contact person name is required").isLength({ max: 100 }),
  body("phone").trim().notEmpty().withMessage("Phone number is required").isLength({ min: 10, max: 15 }),
  body("email").optional({ checkFalsy: true }).trim().isEmail().withMessage("Provide a valid email"),
  body("website").optional({ checkFalsy: true }).trim().isURL().withMessage("Provide a valid website URL"),
];

module.exports = { createSponsorValidator };
