const express = require("express");
const router = express.Router();

const { Signup, Login, AllUserData ,Logout} = require("../controllers/AuthController.js");
const { CheckLogin } = require("../middleware/CheckLogin.js");

router.post("/register", Signup);
router.post("/login", Login);
router.get("/all-data",CheckLogin, AllUserData);
router.get("/logout",Logout)


module.exports=router;