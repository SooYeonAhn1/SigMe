const jwtUtils = require("./jwt");
const passwordUtils = require("./password");
const UserDB = require("../models/User");
const { OAuth2Client } = require("google-auth-library");

// code verification set up
async function verifyGoogleCode(code, redirectUri) {
  const GOOGLE_WEB_CLIENT_ID = process.env.GOOGLE_WEB_CLIENT_ID;
  const GOOGLE_WEB_CLIENT_SECRET = (process.env.GOOGLE_WEB_CLIENT_SECRET || "").trim();

  if (!GOOGLE_WEB_CLIENT_ID || !GOOGLE_WEB_CLIENT_SECRET || !redirectUri || !code) {
    throw new Error("Missing credentials or code for exchange.");
  }

  const googleClient = new OAuth2Client(
    GOOGLE_WEB_CLIENT_ID,
    GOOGLE_WEB_CLIENT_SECRET,
    redirectUri
  );

  const tokenResponse = await googleClient.getToken(code);
  const googleTokens = tokenResponse.tokens;

  const ticket = await googleClient.verifyIdToken({
    idToken: googleTokens.id_token,
    audience: GOOGLE_WEB_CLIENT_ID,
  });

  const payload = ticket.getPayload();
    
  const googleUser = {
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
    email_verified: payload.email_verified,
    sub: payload.sub,
  };

  return { googleUser, googleTokens };
}

// social login controller
async function googleLoginController(req, res) {
  console.log("📥 Controller received body:", req.body);
  
  const { code, redirectUri } = req.body;
  
  if (!code) {
    return res.status(400).json({ message: "Token is required" });
  }

  let googleUser;
  let googleTokens;
  try {
    const codeVerificationResponse = await verifyGoogleCode(code, redirectUri);
    googleUser = codeVerificationResponse.googleUser;
    googleTokens = codeVerificationResponse.googleTokens;
  } catch (error) {
    console.error("Google Code Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid Authorization Code or configuration" });
  }

  const googleRefreshToken = googleTokens.refresh_token;
  const googleUID = googleUser.sub;

  let user = await UserDB.findOne({
    $or: [
      { "google.googleUID": googleUID }, // Find by unique Google ID
      { email: googleUser.email }, // Find by verified email
    ],
  });

  if (user) {
    if (!user.google || !user.google.googleUID) {
      user.google = { googleUID: googleUID, refreshToken: googleRefreshToken };
      user.authType = "google";
      user.markModified('google');
    } else if (googleRefreshToken && user.google.refreshToken !== googleRefreshToken) {
      user.google.refreshToken = googleRefreshToken;
      user.markModified('google'); 
    }
    await user.save();
  } else {
    // Ensure a unique username is created (Simple solution: use part of email)
    const usernameBase = googleUser.email.split("@")[0];

    user = new UserDB({
      email: googleUser.email,
      name: googleUser.name,
      username: usernameBase,
      picture: googleUser.picture,
      authType: "google",
      google: { googleUID: googleUID, refreshToken: googleRefreshToken },
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
      authType: user.authType,
    },
    accessToken,
    refreshToken,
  });
}

module.exports = {
  googleLoginController,
};
