// server/auths/userAccount.service.js

const User = require("../models/User");
const OnboardingProfile = require("../models/OnboardingProfile");
// const ChecklistResponse = require("../models/ChecklistResponse");
const bcrypt = require("bcrypt");

const deleteAccountController = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Authentication is required" });
    }

    const session = await User.startSession();
    session.startTransaction();

    try {
      const user = await User.findById(userId)
        .select("+password")
        .session(session);

      if (!user) {
        await session.abortTransaction();
        return res.status(404).json({ message: "User not found" });
      }
      if (user.authType === "local") {
        if (!password) {
          await session.abortTransaction();
          return res.status(400).json({ message: "Password is required" });
        }
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          await session.abortTransaction();
          return res.status(401).json({ message: "Password doesn't match" });
        }
      } else if (user.authType === "google") {
        // Google Account
      }

      await OnboardingProfile.deleteMany({ userId }, { session });
      await User.findByIdAndDelete(userId, { session });

      await session.commitTransaction();

      res.json({ message: "Successfully deleted" });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { deleteAccountController };
