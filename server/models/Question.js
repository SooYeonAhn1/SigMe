const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
      enum: ["daily", "as_needed"],
      required: true,
    },
    questionType: {
      type: String,
      enum: ["boolean", "single", "multiple", "scale"],
      required: true,
    },
    options: {
      type: [String],
      required: function () {
        return ["single", "multiple"].includes(this.questionType);
      },
      validate: {
        validator: function (v) {
          return (
            // Single or multiple choice question?
            !["single", "multiple"].includes(this.questionType) ||
            (v && v.length > 0)
          );
        },
      },
    },

    scaleConfig: {
      min: {
        type: Number,
        default: 1,
      },
      max: {
        type: Number,
        default: 10,
      },
      minLabel: String,
      maxLabel: String,
    },

    relatedSymptoms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Symptom",
      },
    ],
    orderPriority: {
      type: Number,
      default: 0,
    },
    required: false,
  },
  { timestamps: true }
);

questionSchema.index({ category: 1, order: 1 });
questionSchema.index({ isActive: 1 });
questionSchema.index({ relatedSymptoms: 1 });

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

module.exports = Question;
