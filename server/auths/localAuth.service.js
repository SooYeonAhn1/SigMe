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

  console.log('Registering user with email:', email);
  console.log('Password received (not logged for security reasons)');
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

  return res.status(201).json({ message: "User registered successfully" });
}

module.exports = {
  registerController,
};