// server\models\OnboardingProfile.js
const mongoose = require("mongoose");

const onboardingProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    selectedSymptoms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Symptom",
      },
    ],
    dailyResetHour: {
      type: Number,
      default: 4,
    },
    features: {
      menstruation: {
        isEnabled: {
          type: Boolean,
          default: false,
        }
      },
      medicationTimes: [
        {
          type: String,
          enum: ["morning", "lunch", "dinner", "beforeBed", "asNeeded", "none"],
        },
      ],
    },
  },
  { timestamps: true }
);

onboardingProfileSchema.index({ updatedAt: 1 });

const OnboardingProfile =
  mongoose.models.OnboardingProfile ||
  mongoose.model("OnboardingProfile", onboardingProfileSchema);

module.exports = OnboardingProfile;
