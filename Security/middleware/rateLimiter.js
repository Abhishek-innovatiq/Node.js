const rateLimit = require("express-rate-limit");

exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests
  message: {
    success: false,
    message: "Too many attempts, try again after 15 minutes"
  }
});