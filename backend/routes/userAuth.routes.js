const express = require("express");
const {
  signup,
  login,
  verifyToken,
} = require("../controllers/userAuth.controller");
const limiter = require("../utils/rateLimiter");

const router = express.Router();

router.post("/signup", limiter, signup);
router.post("/login", limiter, login);
router.get("/verify/:token", verifyToken);

module.exports = router;
