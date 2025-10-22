require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); 
const { googleLoginController } = require("./auths/googleAuth.service");
const { registerController } = require("./auths/localAuth.service");

const path = require('path'); 

if (process.env.MONGODB_URI === undefined) { // depending on cwd settings .env may not be loaded correctly
    require('dotenv').config({ 
        path: path.resolve(__dirname, '..', '.env') 
    }); 
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 3001;

// app.use(cors());
app.use(cors({
  origin: '*', // this is to surpass cors erros during mobile web dev. need to specify when actually deploying app
  methods: 'GET,POST,PUT,DELETE', // Allow all necessary methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  // credentials: true // if cookies/sessions are used later
}));

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
