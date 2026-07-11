const { body } = require("express-validator");
const { TEAM_TIERS } = require("../constants");

const createTeamValidator = [
  body("fullName").trim().notEmpty().withMessage("Full name is required").isLength({ max: 100 }),
  body("tier").trim().notEmpty().withMessage("Tier is required").isIn(TEAM_TIERS).withMessage(`Tier must be one of: ${TEAM_TIERS.join(", ")}`),
  body("designation").optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body("phone").optional({ checkFalsy: true }).trim().isLength({ min: 10, max: 15 }),
  body("email").optional({ checkFalsy: true }).trim().isEmail().withMessage("Provide a valid email"),
  body("occupation").optional({ checkFalsy: true }).trim().isLength({ max: 150 }),
  body("city").optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body("state").optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body("country").optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body("additionalInfo").optional({ checkFalsy: true }).trim().isLength({ max: 2000 }),
];

const updateTeamValidator = [
  body("fullName").optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body("tier").optional({ checkFalsy: true }).trim().isIn(TEAM_TIERS).withMessage(`Tier must be one of: ${TEAM_TIERS.join(", ")}`),
  body("designation").optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body("phone").optional({ checkFalsy: true }).trim().isLength({ min: 10, max: 15 }),
  body("email").optional({ checkFalsy: true }).trim().isEmail().withMessage("Provide a valid email"),
  body("occupation").optional({ checkFalsy: true }).trim().isLength({ max: 150 }),
  body("city").optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body("state").optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body("country").optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body("additionalInfo").optional({ checkFalsy: true }).trim().isLength({ max: 2000 }),
];

module.exports = { createTeamValidator, updateTeamValidator };
