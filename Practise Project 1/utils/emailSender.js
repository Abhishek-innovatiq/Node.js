const nodemailer = require("nodemailer");4
require("dotenv").config();

const transporter  = nodemailer.createTransport({
      service :"gmail",
      auth :{
            user : process.env.EMAIL,
            pass : process.env.PASSWORD

      }
})

async function emailSender(Name,Email) {
      try {
            const info = await transporter.sendMail({
                  from :`Abhishek sen ${process.env.EMAIL}`,
                  to: Email,
                  text: "i am your friend"
            });

            console.log("email send ", info.messageId);
            return info;
            
      } catch (error) {
            console.log("geting error in sending mail", error)
            
      }
      
}
module.exports = emailSender;