const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    desc_KO: {
      type: String,
      required: true,
    },
    desc_EN: String,
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

const Symptom =
  mongoose.models.Symptom || mongoose.model("Symptom", symptomSchema);

module.exports = Symptom;
