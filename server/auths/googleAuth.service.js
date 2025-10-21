// originally index.js

const jwtUtils = require("./jwt");
const passwordUtils = require("./password");
const UserDB = require("../models/User");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.GOOGLE_WEB_CLIENT_ID);

// token verification set up
async function verifyGoogleToken(token) {
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_WEB_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return {
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
    email_verified: payload.email_verified,
    sub: payload.sub,
  };
}

// social login controller
async function googleLoginController(req, res) {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  let googleUser;
  try {
    googleUser = await verifyGoogleToken(token);
  } catch (error) {
    console.error("Google Token Verification Error:", error);
    return res.status(401).json({ message: "Invalid Google token" });
  }

  if (!googleUser.email_verified) {
    return res.status(403).json({ message: "Google email not verified" });
  }

  const googleUID = googleUser.sub;

  let user = await UserDB.findOne({
    $or: [
      { "google.googleUID": googleUID }, // Find by unique Google ID
      { email: googleUser.email }, // Find by verified email
    ],
  });

  if (user) {
    // If user was found by email but is missing the googleUID field (e.g., local login merging to Google)
    if (!user.google || !user.google.googleUID) {
      // Merge account: Link the Google UID and set authType
      user.google = { googleUID: googleUID };
      user.authType = "google";
      await user.save();
    }
  } else {
    // Ensure a unique username is created (Simple solution: use part of email)
    const usernameBase = googleUser.email.split("@")[0]

    user = new UserDB({
      email: googleUser.email,
      name: googleUser.name,
      username: usernameBase,
      picture: googleUser.picture,
      authType: "google",
      google: { googleUID: googleUID },
    });
    await user.save();
  }

  const { accessToken, refreshToken } = jwtUtils.signTokens(user);

  return res.status(200).json({
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      username: user.username,
      roles: user.roles,
    },
    accessToken,
    refreshToken,
  });
}

module.exports = {
  googleLoginController,
};
