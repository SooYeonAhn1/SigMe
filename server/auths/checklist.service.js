// apps/server/auths/checklist.service.js

const jwtUtils = require("./jwt");
const DailyChecklistDB = require("../models/DailyChecklist");

async function dailyChecklistController(req, res) {
  try {
    const { userId, dailyTasks } = req.body;
    if (!Array.isArray(dailyTasks)) {
      return res.status(400).json({ message: 'No items data received.' });
    }
    console.log("server/auths/checklist.service display userId:", userId);
    const newBackend = dailyTasks.map((task) => {
      return {
        taskId: task.id,
        description: task.text,
        isCompleted: task.checked
      };
    });

    const date = new Date();

    const newDailyChecklist = new DailyChecklistDB({
      userId: userId,
      date: date,
      tasks: newBackend
    });

    const savedChecklist = await newDailyChecklist.save();

    res.status(201).json(savedChecklist);
  } catch (error) {
    console.error("checklist.server.js received error:", error);

    // same date/id combo exists
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'A checklist for this user and date already exists.'
      });
    }

    // other validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation failed.',
        error: error.message
      });
    }
    res.status(500).json({ message: 'Server error while saving.' });
  }
}

module.exports = {
  dailyChecklistController,
};