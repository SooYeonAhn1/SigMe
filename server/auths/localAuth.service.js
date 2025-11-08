// apps/server/auths/localAuth.service.js

// for raw registration where user adds username/password directly

const jwtUtils = require("./jwt");
const passwordUtils = require("./password");
const UserDB = require("../models/User");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10; // for password hashing

// registration controller
async function registerController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Password validation
    const PASSWORD_REGEX =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*,.?])[A-Za-z\d~!@#$%^&*,.?]{8,}$/;
    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character from ~!@#$%^*,.?",
      });
    }

    // Check if user already exists
    const existingUser = await UserDB.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // generate a username
    const usernameBase = email.split("@")[0];

    // Create new user
    const newUser = new UserDB({
      email: email,
      password: hashedPassword,
      username: usernameBase,
      authType: "local",
    });

    await newUser.save();

    const { accessToken, refreshToken } = jwtUtils.signTokens(newUser);
    console.log("generated token");
    return res.status(201).json({
      message: "User registered successfully",
      user: { email: newUser.email, username: newUser.username },
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
}

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await UserDB.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.authType !== "local") {
      return res.status(400).json({
        message:
          "This account uses Google sign-in. Please use Google to log in.",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = jwtUtils.signTokens(user);

    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        roles: user.roles,
        authType: user.authType,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerController,
  loginController,
};
