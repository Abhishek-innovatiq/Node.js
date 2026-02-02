const express = require("express");
const DbConnect = require("./configuration/ConnectDB.js");
const cookieParser=require("cookie-parser");
const authRoute=require("./routes/AuthRoute.js");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());

DbConnect();

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("<h1>Task 5</h1>")
})
app.use("/auth",authRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server run kar rha hai ${port}`)
})