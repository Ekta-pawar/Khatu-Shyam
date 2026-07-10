const { body } = require("express-validator");

const createSponsorValidator = [
  body("sponsorName").trim().notEmpty().withMessage("Sponsor/organization name is required").isLength({ max: 150 }),
  body("sponsorType").optional({ checkFalsy: true }).trim(),
  body("contactPerson").optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body("phone").optional({ checkFalsy: true }).trim().isLength({ min: 10, max: 15 }),
  body("email").optional({ checkFalsy: true }).trim().isEmail().withMessage("Provide a valid email"),
  body("website").optional({ checkFalsy: true }).trim().isURL().withMessage("Provide a valid website URL"),
];

module.exports = { createSponsorValidator };
