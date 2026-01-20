const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  Name: { type: String },
  Email: { type: String },
  image:{type:String},
  Password :{type : String},
  Confirm_Password :{ type :String},
  Age: { type: Number },
});
module.exports = mongoose.model("user",userSchema)