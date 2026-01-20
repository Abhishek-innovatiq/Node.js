const express = require('express');
const { createUser, getUSer, updateUser, deleteUser, login, logout } = require('../controller/userController');
const { checkLogin } = require('../middleware/loginMiddleware');
const router = express.Router();

router.post("/create-user",createUser)
router.get("/get-user",checkLogin,getUSer)
router.put("/update-user",checkLogin,updateUser)
router.delete("/delete-user",checkLogin,deleteUser)
router.post("/login",login)
router.post("/logout",logout)


module.exports = router;

