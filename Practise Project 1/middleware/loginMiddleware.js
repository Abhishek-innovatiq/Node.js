const jwt = require("jsonwebtoken")
require("dotenv").config(); 


exports.checkLogin = async (req,res,next)=>{
 
      try{

            const {token} = req.cookies || req.body
            if(!token){
                  return res.status(500).json({
                        sucess :false,
                        message:"please login before access"
                  })
            }

            const tokenpayload = jwt.verify(token,process.env.JWT_SECRET)

            req.user = tokenpayload;

            if(!tokenpayload){
                  return res.status(500).json({
                        sucess : false,
                        message: "token galat aa rha hai"
                  })
            }
            next();


      }
      catch(err){
          return res.status(500).json({
            success : false,
            message:"getting eror in login middleware"
          })
      }
}