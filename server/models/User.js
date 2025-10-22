const mongoose = require("mongoose");

const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*,.?])[A-Za-z\d!@#$%^&*,.?]{8,}$/;

const userSchema = new mongoose.Schema(
  {
    authType: {
      type: String,
      enum: ["google", "local"], // "kakao",
      required: true,
      default: "local",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    password: {
      type: String,
      required: function () {
        return this.authType === "local";
      },
      minlength: 8,
      select: false,
      validate: {
        validator: (v) => PASSWORD_REGEX.test(v),
        message:
          "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character from !@#$%^*,.?",
      },
    },
    google: {
      googleUID: {
        type: String,
        sparse: true,
        select: false,
      },
      refreshToken: {
        type: String,
        select: false,
      },
    },
    /*    kakao: {
      kakaoUID: {
        type: String,
        sparse: true,
        select: false,
      },
      refreshToken: {
        type: String,
        select: false,
      },
    },*/

    username: {
      // nickname
      type: String,
      required: true,
      trim: true,
      match: [
        /^[A-Za-z0-9가-힣'\-]+$/,
        "English letters, Korean letters, digits, apostrophes ('), and dashes (-) only allowed",
      ],
      minlength: 3,
      maxlength: 8,
    },

    roles: {
      type: [String],
      enum: ["user", "dbAdmin"],
      default: ["user"],
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

userSchema.index({ roles: 1 });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 });
userSchema.index({ createdAt: -1 });

userSchema.index({ "google.googleUID": 1 }, { unique: true, sparse: true });
// userSchema.index({ "kakao.kakaoUID": 1 }, { unique: true, sparse: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
