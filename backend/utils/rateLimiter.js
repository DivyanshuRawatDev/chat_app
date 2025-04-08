const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    message:
      "Too many login attempts from this IP, please try again after 15 minutes.",
  },
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

module.exports = limiter;
