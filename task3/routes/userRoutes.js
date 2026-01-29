const express = require('express');
const { getUSer, deleteUser, updateUser, addUSer } = require('../controller/userController');

const router = express.Router();

router.get("/getUser",getUSer)
router.post("/addUSer",addUSer)
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;