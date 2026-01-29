const express = require("express");
const {
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

const router = express.Router();

router.get("/getUser", getUser);
router.post("/addUser", addUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
