const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { COOKIE_NAME } = require("../constants");

const generateToken = (payload) => {
  return jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn });
};



const cookieOptions = () => ({
  httpOnly: true,
  secure: env.cookie.secure,
  sameSite: env.cookie.sameSite,
  path: "/",
  maxAge: env.jwt.cookieExpiresInDays * 24 * 60 * 60 * 1000,
});

const sendTokenResponse = (res, payload) => {
  const token = generateToken(payload);
  console.log("Generated Token:", token);
  res.cookie(COOKIE_NAME, token, cookieOptions());
  return token;
};

const clearTokenCookie = (res) => {
  res.cookie(COOKIE_NAME, "", {
    httpOnly: true,
    secure: env.cookie.secure,
    sameSite: env.cookie.sameSite,
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
};

module.exports = { generateToken, sendTokenResponse, clearTokenCookie, cookieOptions };
