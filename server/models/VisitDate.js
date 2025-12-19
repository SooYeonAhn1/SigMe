// server\models\VisitDate.js
const mongoose = require("mongoose");

const visitDateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled", "rescheduled"],
    default: "scheduled"
  },
}, { timestamps: true });

visitDateSchema.index({ userId: 1, scheduledDate: 1 });
visitDateSchema.index({ status: 1 });

const VisitDate = mongoose.models.VisitDate || mongoose.model("VisitDate", visitDateSchema);
module.exports = VisitDate;