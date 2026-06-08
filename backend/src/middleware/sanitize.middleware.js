/**
 * express-mongo-sanitize / xss-clean both reassign req.query, which Express 5
 * exposes as a getter-only property ("Cannot set property query of
 * #<IncomingMessage> which has only a getter"). This middleware achieves the
 * same protection — stripping Mongo operator keys and escaping HTML — by
 * mutating req.body / req.params / req.query in place instead of replacing them.
 */

const isPlainObject = (value) => Object.prototype.toString.call(value) === "[object Object]";

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

const sanitizeValue = (value) => {
  if (typeof value === "string") {
    return escapeHtml(value);
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      value[index] = sanitizeValue(item);
    });
    return value;
  }

  if (isPlainObject(value)) {
    Object.keys(value).forEach((key) => {
      if (key.startsWith("$") || key.includes(".")) {
        delete value[key];
        return;
      }
      value[key] = sanitizeValue(value[key]);
    });
    return value;
  }

  return value;
};

const sanitizeRequest = (req, res, next) => {
  if (req.body) sanitizeValue(req.body);
  if (req.params) sanitizeValue(req.params);
  if (req.query) sanitizeValue(req.query);
  next();
};

module.exports = sanitizeRequest;
