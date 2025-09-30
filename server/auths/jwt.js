const jwt = require("jsonwebtoken");

function buildToken(user) {
  return {
    sub: String(user._id),
    email: user.email,
    username: user.username,
    roles: Array.isArray(user.roles) ? user.roles : ["user"],
  };
}

function generateAccessToken(user) {
  const token = buildToken(user);
  return jwt.sign(token, process.env.JWT_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(user) {
  const payload = {
    sub: String(user._id),
    type: "refresh",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

function decodeToken(token) {
  try {
    return jwt.decode(token);
  } catch {
    return null;
  }
}

function signTokens(user) {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  decodeToken,
  signTokens,
};
