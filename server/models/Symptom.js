const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      ko: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: false }
);

symptomSchema.index({ name: 1 });

const Symptom =
  mongoose.models.Symptom || mongoose.model("Symptom", symptomSchema);

module.exports = Symptom;
