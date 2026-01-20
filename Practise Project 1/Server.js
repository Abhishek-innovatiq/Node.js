// 1️⃣ Import required packages sabse pehle
const express = require('express');
const cookieParser = require("cookie-parser");
const dbconnect = require('./config/dbConnection.js');
const userRoute = require('./routes/userRoute.js');
require("dotenv").config();  // .env variables load karne ke liye

// 2️⃣ App initialize karo
const app = express();

// 3️⃣ Middlewares (request process hone se pehle run hote hain)
app.use(express.json());      // JSON body read karne ke liye
app.use(cookieParser());      // Cookies ko read karne ke liye


// 4️⃣ Database connect karo (app chalne se pehle DB ready hona chahiye)
dbconnect();

const fileupload = require("express-fileupload")
app.use(fileupload({useTempFiles:true,}));
// 5️⃣ Default test route (optional)
app.get("/", (req, res) => {
  res.send("<h1>This is a practise file 123</h1>");
});

// 6️⃣ Routes mount karo (modular routing ke liye)
app.use('/api/user', userRoute);

// 7️⃣ Server ko listen karwao (sabse last me)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});


