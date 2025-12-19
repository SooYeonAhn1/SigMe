// server\models\VisitDate.js

const visitSchema = new mongoose.Schema({
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

visitSchema.index({ userId: 1, scheduledDate: 1 });
visitSchema.index({ status: 1 });