const mongoose = require('mongoose');


const dbconnect= async()=>{
      
try{
   await mongoose.connect("mongodb://localhost:27017/task3")
   console.log("db connected succesfull")
}
catch(err){
      console.log("catching error in db connection",err)
}
}

module.exports = dbconnect;
