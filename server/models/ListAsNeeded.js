// DailyChecklist.js
const mongoose = require("mongoose");

const taskAsNeeded = new mongoose.Schema(
  {
    taskId: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    // ,
    // completedAt: {
    //   type: Date,
    //   required: function() { return this.isCompleted; }
    // }
  },
  { _id: true }
);

const listAsNeeded = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    tasks: [taskAsNeeded],
  },
  {
    timestamps: true,
  }
);

listAsNeeded.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("taskAsNeeded", taskAsNeeded);
module.exports = mongoose.model("listAsNeeded", listAsNeeded);
