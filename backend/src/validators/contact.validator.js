const { body } = require("express-validator");

const createContactValidator = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Provide a valid email"),
  body("phone").optional({ checkFalsy: true }).trim().isLength({ min: 10, max: 15 }).withMessage("Provide a valid phone number"),
  body("subject").trim().notEmpty().withMessage("Subject is required").isLength({ max: 150 }),
  body("message").trim().notEmpty().withMessage("Message is required").isLength({ max: 2000 }),
];

module.exports = { createContactValidator };
