const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.query.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // lưu toàn bộ payload vào req.user
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

// Auth middleware that accepts token from URL query param or Authorization header
exports.authMiddlewareFromUrl = (req, res, next) => {
  // Ưu tiên Authorization header > query token > cookie
  let token = req.query.token || req.cookies.token;

  // Kiểm tra Authorization header (Bearer token)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7); // Lấy phần sau "Bearer "
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // lưu toàn bộ payload vào req.user
    next();
  } catch (err) {
    console.error("Token validation error:", err.message);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

exports.requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  };
};
