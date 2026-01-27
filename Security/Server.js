// step-1 install & import
const express = require("express");
const mongoose = require("mongoose");
const UserRoute = require("./routes/UserRoute");

// step-2 create app
const app = express();

// step-3 middleware
app.use(express.json());

// step-4 demo route
app.get("/", (req, res) => {
  res.send("<h1>Rate Limiting</h1>");
});

// step-5 routes
app.use("/api/v1/users", UserRoute);

// step-6 database connection
mongoose.connect("mongodb://localhost:27017/authDB")
.then(() => {
  console.log("Database connected successfully");
})
.catch(() => {
  console.log("Error while connecting database");
});

// step-7 start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});