const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {

  console.log('GET / request received');
  res.status(200).send({
    message: "CareFlow API Server is running successfully!",
    status: "OK",
    environment: process.env.NODE_ENV || 'development'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the server via: http://localhost:${PORT}`);
});

