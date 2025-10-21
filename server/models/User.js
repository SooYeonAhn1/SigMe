const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    authType: {
      type: String,
      enum: ["google", "kakao", "local"],
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
      match: [
        /^[A-Za-z0-9!@#$%^&*(),.?:{}|<>_\-+=~`[\]\\;/]+$/,
        "A-Z, a-z, numbers, and special characters only allowed (case sensitive)",
      ],
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
    kakao: {
      kakaoUID: {
        type: String,
        sparse: true,
        select: false,
      },
      refreshToken: {
        type: String,
        select: false,
      },
    },

    username: {
      // nickname
      type: String,
      required: true,
      unique: true,
      trim: true,
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
userSchema.index({ "kakao.kakaoUID": 1 }, { unique: true, sparse: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
