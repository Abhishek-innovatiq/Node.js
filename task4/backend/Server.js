const express = require('express');
const userRoute = require('./routes/userRoutes');
const dbconnect = require('./config/dbConnection');
const cors = require('cors'); 

const app = express();

app.use(cors()); 

app.use(express.json());

dbconnect();

app.get("/", (req, res) => {
  res.send("<h1>This is a Backend task</h1>");
});

app.use('/user', userRoute);

const port = 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});