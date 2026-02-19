import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "../models/usermodel";

interface EmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const SendEmail=async({email,emailType ,userId}:EmailParams)=>{


    try{

const hashedPassword=await bcrypt.hash(userId.toString(),10)

if(emailType=="VERIFY"){
  await User.findByIdAndUpdate(userId,
    {verifiedToken:hashedPassword, verifyTokenExpiery:Date.now()+3600000}
  )
}
else if(emailType=="RESET"){
  await User.findByIdAndUpdate(userId,
    { forgotPasswordToken:hashedPassword,  forgotPasswordTokenExpiery:Date.now()+3600000}
  )
}



   // Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5cb6ac97372373",  // try to push these inside the env
    pass: "4b0938ed7377e6"
  }
});


const mailOption={
     from: 'nikhilgupta542006@gmail.com',
    to: email, // this is a method 
    subject:emailType,
  //  text: "Hello world?", // Plain-text version of the message
     html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedPassword}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedPassword}
            </p>`
}

const mailResponce=await transport.sendMail(mailOption)
return mailResponce


}

catch(error:unknown){
const message = error instanceof Error ? error.message : "An unknown error occurred";
throw new Error(message)
}
}