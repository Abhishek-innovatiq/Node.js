const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  try {
    // step-1 get token from headers
    const token = req.headers.authorization;

    // step-2 check token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing, login first"
      });
    }

    // step-3 verify token
    const decoded = jwt.verify(token, "SECRET_KEY");

    // step-4 attach user id in request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};