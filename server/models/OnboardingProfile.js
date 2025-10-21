const mongoose = require("mongoose");

const onboardingProfileSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    selectedSymptoms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Symptom",
      },
    ],
    isDiagnosed: {
      type: Boolean,
      required: true,
    },
    isVisitingHospital: {
      type: String,
      enum: ["currently", "never", "visited_before"],
      required: true,
    },
    dailyResetHour: {
      type: Number,
      default: 4,
    },
    features: {
      menstruation: {
        enabled: {
          type: Boolean,
          default: false,
        },
        initialData: {
          averageCycle: Number,
          averagePeriodLength: Number,
          lastPeriodStartDate: Date,
          knowsOvulationDate: Boolean,
          ovulationDate: Date,
        },
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
