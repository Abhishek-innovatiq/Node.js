const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controller/UserController");
const { isAuthenticated } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimiter");

// public routes
router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);

// protected route
router.get("/profile", isAuthenticated, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to profile",
    userId: req.user.id
  });
});

module.exports = router;