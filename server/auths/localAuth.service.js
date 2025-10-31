// apps/server/auths/localAuth.service.js

// for raw registration where user adds username/password directly

const jwtUtils = require("./jwt");
const passwordUtils = require("./password");
const UserDB = require("../models/User");
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10; // for password hashing

// registration controller
async function registerController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if user already exists
  const existingUser = await UserDB.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already taken" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // generate a username
  const usernameBase = email.split("@")[0]

  // Create new user
  const newUser = new UserDB({
    email: email,
    password: hashedPassword,
    username: usernameBase,
    authType: "local",
  });

  await newUser.save();

  const accessToken = jwtUtils.generateAccessToken(newUser._id);
  const refreshToken = jwtUtils.generateRefreshToken(newUser._id);
  console.log("generated token");
  return res.status(201).json({
    message: "User registered successfully",
    user: { email: newUser.email, username: newUser.username },
    accessToken: accessToken,
    refreshToken: refreshToken
  });
}

module.exports = {
  registerController,
};