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
  body("firstName").trim().notEmpty().withMessage("First name is required").isLength({ max: 50 }),
  body("lastName").trim().notEmpty().withMessage("Last name is required").isLength({ max: 50 }),
  body("gender").trim().notEmpty().withMessage("Gender is required").isIn(GENDERS).withMessage(`Gender must be one of: ${GENDERS.join(", ")}`),
  body("phone").trim().notEmpty().withMessage("Phone number is required").isLength({ min: 10, max: 15 }),
  body("alternatePhone").optional({ checkFalsy: true }).trim().isLength({ min: 10, max: 15 }),
  body("email").optional({ checkFalsy: true }).trim().isEmail().withMessage("Provide a valid email"),
  body("bloodGroup").optional({ checkFalsy: true }).isIn(BLOOD_GROUPS).withMessage(`Blood group must be one of: ${BLOOD_GROUPS.join(", ")}`),
  body("pincode").optional({ checkFalsy: true }).trim().isLength({ min: 4, max: 10 }),

  body("specialDates").optional().isObject().withMessage("specialDates must be an object"),
  body("specialDates.birthdays").optional().isArray().withMessage("birthdays must be an array"),
  body("specialDates.birthdays.*.personName").optional().trim().notEmpty().withMessage("Birthday personName is required"),
  body("specialDates.birthdays.*.birthDate").optional().isISO8601().withMessage("Birthday birthDate must be a valid date"),

  body("specialDates.anniversaries").optional().isArray().withMessage("anniversaries must be an array"),
  body("specialDates.anniversaries.*.husbandName").optional().trim().notEmpty().withMessage("Anniversary husbandName is required"),
  body("specialDates.anniversaries.*.wifeName").optional().trim().notEmpty().withMessage("Anniversary wifeName is required"),
  body("specialDates.anniversaries.*.anniversaryDate").optional().isISO8601().withMessage("anniversaryDate must be a valid date"),

  body("specialDates.customDates").optional().isArray().withMessage("customDates must be an array"),
  body("specialDates.customDates.*.title").optional().trim().notEmpty().withMessage("Custom date title is required"),
  body("specialDates.customDates.*.date").optional().isISO8601().withMessage("Custom date must be a valid date"),

  body("familyDetails").optional().isObject().withMessage("familyDetails must be an object"),
  body("familyDetails.members").optional().isArray({ max: 30 }).withMessage("familyDetails.members must be an array"),
  body("familyDetails.members.*.name").optional().trim().notEmpty().withMessage("Family member name is required"),
  body("familyDetails.members.*.relation").optional().trim().notEmpty().withMessage("Family member relation is required"),
  body("familyDetails.members.*.age").optional().isInt({ min: 0, max: 150 }).withMessage("Family member age must be valid"),
];

const updateMemberValidator = createMemberValidator.map((rule) => rule.optional());

module.exports = { parseJsonFields, memberJsonFields, createMemberValidator, updateMemberValidator };
