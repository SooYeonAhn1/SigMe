const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    description: String,
    /*    category: {
      type: String,
      enum: ["bipolar", "depression", "adhd", "other"],
      default: "other",
    },*/
    relatedQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: true }
);

symptomSchema.index({ name: 1 });
symptomSchema.index({ isActive: 1 });
symptomSchema.index({ category: 1 });

const Symptom =
  mongoose.models.Symptom || mongoose.model("Symptom", symptomSchema);

module.exports = Symptom;
