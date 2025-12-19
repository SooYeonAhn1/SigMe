// server\models\MenstruationLog.js
const mongoose = require("mongoose");

const menstruationProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  averageCycle: {
    type: Number,
    required: true,
    min: 21
  },
  lastPeriodStartDate: {
    type: Date,
    required: true
  },
//   averagePeriodLength: Number,
//   cycleHistory: [{
//     startDate: Date,
//     endDate: Date,
//     cycleLength: Number
//   }],
}, { timestamps: true });

const MenstruationProfile = mongoose.models.MenstruationProfile || mongoose.model("MenstruationProfile", menstruationProfileSchema);
module.exports = MenstruationProfile;