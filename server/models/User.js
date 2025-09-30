const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
      match: [
        /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/]+$/,
        "A-Z, a-z, numbers, and special characters only allowed (case sensitive)",
      ],
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
    // birthDate: { type: Date, required: true },
    // hasMenstruation: { type: Boolean, required: true },
    // settings:{},
    // answers: [{}],
  },

  // birthDate: { type: Date, required: true },
  // hasMenstruation: { type: Boolean, required: true },
  // settings:{},
  // answers: [{}],
  { timestamps: true } // createdAt, updatedAt
);

userSchema.index({ roles: 1 });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ createdAt: -1 });

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
