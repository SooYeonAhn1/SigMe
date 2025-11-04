// server/middleware/auth.js
const { verifyToken } = require("../auths/jwt");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  req.userId = decoded.sub;
  req.userEmail = decoded.email;
  req.userRoles = decoded.roles;

  next();
};

module.exports = { authenticateToken };
