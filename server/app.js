// server\app.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { googleLoginController } = require("./auths/googleAuth.service");
const {
  registerController,
  loginController,
} = require("./auths/localAuth.service");
const { authenticateToken } = require("./middleware/auth");
const { dailyChecklistController } = require("./service/checklist.service");
const { deleteAccountController } = require("./auths/userAccount.service");
const {
  getSymptomsController,
  saveOnboardingController,
  saveVisitDateController,
  saveMenstruationController,
  getOnboardingController,
} = require("./service/onboarding.service");

const path = require("path");

if (process.env.MONGODB_URI === undefined) {
  // depending on cwd .env may not be loaded correctly
  require("dotenv").config({
    path: path.resolve(__dirname, "..", ".env"),
  });
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
const PORT = process.env.PORT || 3001;

// app.use(cors());
app.use(
  cors({
    origin: "*", // this is to surpass cors errors during mobile web dev. need to specify when actually deploying app
    methods: ["GET", "POST", "PUT", "DELETE", "OPTION"], // Allow all necessary methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    // credentials: true // if cookies/sessions are used later
  })
);
app.options("*", cors());
app.use(express.json());

// Route ============================================

app.get("/", (req, res) => {
  console.log("GET / request received");
  res.status(200).send({
    message: "SigMe API Server is running successfully!",
    status: "OK",
    environment: process.env.NODE_ENV || "development",
  });
});

// Authentication

app.post("/auth/google", googleLoginController);
app.post("/api/register", registerController);
app.post("/api/login", loginController);

app.post("/api/checklist", authenticateToken, dailyChecklistController);

app.delete("/api/users/delete", authenticateToken, deleteAccountController);

console.log(`post to /api/checklist sent at ${PORT}`);

// OnBoarding

app.get("/api/symptoms", getSymptomsController);
app.get("/api/onboarding", authenticateToken, getOnboardingController);
app.post("/api/onboarding", authenticateToken, saveOnboardingController);
app.post("/api/visits", authenticateToken, saveVisitDateController);
app.post("/api/menstruation", authenticateToken, saveMenstruationController);

// ==================================================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the server via: http://localhost:${PORT}`);
});
