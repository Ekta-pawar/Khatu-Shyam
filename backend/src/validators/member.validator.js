const { body } = require("express-validator");
const { GENDERS, BLOOD_GROUPS } = require("../constants");

const parseJsonFields = (fields) => (req, res, next) => {
  fields.forEach((field) => {
    if (typeof req.body[field] === "string" && req.body[field].trim() !== "") {
      try {
        req.body[field] = JSON.parse(req.body[field]);
      } catch (error) {
        return next(Object.assign(new Error(`Invalid JSON provided for field '${field}'`), { statusCode: 400 }));
      }
    }
  });
  next();
};

const memberJsonFields = ["specialDates", "familyDetails"];

const createMemberValidator = [
  body("fullName").optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body("firstName")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .custom((value, { req }) => {
      if (!req.body.fullName && !value) {
        throw new Error("Provide fullName, or at least a firstName");
      }
      return true;
    }),
  body("lastName").optional({ checkFalsy: true }).trim().isLength({ max: 50 }),
  body("phone").optional({ checkFalsy: true }).trim().isLength({ min: 10, max: 15 }),
  body("alternatePhone").optional({ checkFalsy: true }).trim().isLength({ min: 10, max: 15 }),
  body("email").optional({ checkFalsy: true }).trim().isEmail().withMessage("Provide a valid email"),
  body("gender").optional({ checkFalsy: true }).isIn(GENDERS).withMessage(`Gender must be one of: ${GENDERS.join(", ")}`),
  body("bloodGroup").optional({ checkFalsy: true }).isIn(BLOOD_GROUPS).withMessage(`Blood group must be one of: ${BLOOD_GROUPS.join(", ")}`),
  body("pincode").optional({ checkFalsy: true }).trim().isLength({ min: 4, max: 10 }),
  body("eventName").optional({ checkFalsy: true }).trim().isLength({ max: 150 }),
  body("eventDate").optional({ checkFalsy: true }).isISO8601().withMessage("Provide a valid event date"),
  body("additionalInfo").optional({ checkFalsy: true }).trim().isLength({ max: 2000 }),

  body("specialDates").optional().isObject().withMessage("specialDates must be an object"),
  body("specialDates.birthdays").optional().isArray().withMessage("birthdays must be an array"),
  body("specialDates.anniversaries").optional().isArray().withMessage("anniversaries must be an array"),
  body("specialDates.customDates").optional().isArray().withMessage("customDates must be an array"),

  body("familyDetails").optional().isObject().withMessage("familyDetails must be an object"),
  body("familyDetails.members").optional().isArray({ max: 30 }).withMessage("familyDetails.members must be an array"),
];

const updateMemberValidator = [
  body("fullName").optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body("firstName").optional({ checkFalsy: true }).trim().isLength({ max: 50 }),
  body("lastName").optional({ checkFalsy: true }).trim().isLength({ max: 50 }),
  body("phone").optional({ checkFalsy: true }).trim().isLength({ min: 10, max: 15 }),
  body("alternatePhone").optional({ checkFalsy: true }).trim().isLength({ min: 10, max: 15 }),
  body("email").optional({ checkFalsy: true }).trim().isEmail().withMessage("Provide a valid email"),
  body("gender").optional({ checkFalsy: true }).isIn(GENDERS).withMessage(`Gender must be one of: ${GENDERS.join(", ")}`),
  body("bloodGroup").optional({ checkFalsy: true }).isIn(BLOOD_GROUPS).withMessage(`Blood group must be one of: ${BLOOD_GROUPS.join(", ")}`),
  body("pincode").optional({ checkFalsy: true }).trim().isLength({ min: 4, max: 10 }),
  body("eventName").optional({ checkFalsy: true }).trim().isLength({ max: 150 }),
  body("eventDate").optional({ checkFalsy: true }).isISO8601().withMessage("Provide a valid event date"),
  body("additionalInfo").optional({ checkFalsy: true }).trim().isLength({ max: 2000 }),

  body("specialDates").optional().isObject().withMessage("specialDates must be an object"),
  body("specialDates.birthdays").optional().isArray().withMessage("birthdays must be an array"),
  body("specialDates.anniversaries").optional().isArray().withMessage("anniversaries must be an array"),
  body("specialDates.customDates").optional().isArray().withMessage("customDates must be an array"),

  body("familyDetails").optional().isObject().withMessage("familyDetails must be an object"),
  body("familyDetails.members").optional().isArray({ max: 30 }).withMessage("familyDetails.members must be an array"),
];

module.exports = { parseJsonFields, memberJsonFields, createMemberValidator, updateMemberValidator };
