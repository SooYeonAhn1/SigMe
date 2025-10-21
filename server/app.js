require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); 
const { googleLoginController } = require("./auths/googleAuth.service");
const { registerController } = require("./auths/localAuth.service");

const path = require('path'); 
// console.log('Attempting to connect to MongoDB with URI:', process.env.MONGODB_URI);

if (process.env.MONGODB_URI === undefined) { // depending on cwd settings .env may not be loaded correctly
    require('dotenv').config({ 
        path: path.resolve(__dirname, '..', '.env') 
    }); 
}

// console.log('Current path: ', __dirname);
// console.log('Attempting to connect to MongoDB with URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("GET / request received");
  res.status(200).send({
    message: "SigMe API Server is running successfully!",
    status: "OK",
    environment: process.env.NODE_ENV || "development",
  });
});

console.log('registerController type:', typeof registerController);
app.post('/auth/google', googleLoginController);
app.post('/api/register', registerController);
console.log(
  "Succesfully did either of these: Registered routes: POST /auth/google -> googleLoginController, POST /api/register -> registerController"
)


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the server via: http://localhost:${PORT}`);
});
