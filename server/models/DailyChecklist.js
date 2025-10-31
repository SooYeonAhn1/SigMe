// DailyChecklist.js
const mongoose = require("mongoose");

const dailyTaskSchema = new mongoose.Schema({
  taskId: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
  // ,
  // completedAt: {
  //   type: Date,
  //   required: function() { return this.isCompleted; }
  // }
}, { _id: true }); 

const dailyChecklistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  tasks: [dailyTaskSchema]
}, {
  timestamps: true 
});

dailyChecklistSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyChecklist', dailyChecklistSchema);