// User model import 
// mongooes se db connection
// nextrequest.....
//use async function and wrap it inside the try catch block
//Nextrequest se email and password from body 
// verify the email and password is entered or not 
// hash  password with the help of bycrypt.js
//verify password from User model 
//if password verify send refresh token to the client and and save the refresh token in the backend with expiry time 
// on every request this refresh token veryfy from the backend 


import { connect } from "@/src/dbConfig/dbconfig";
import User from "@/src/models/usermodel"; 
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(request:NextRequest){
    try {
        // const reqbody=request.body;
        // const {email,password}=reqbody
        const reqBody = await request.json()  // remember in next we accept data from the json not from the body
        const {email, password} = reqBody;

        if(!email || !password){
            return NextResponse.json({error:"please provide all field"},{status:500})
        }
        console.log("userexist") 
        const user= User.findOne({email})
        console.log(user)
        // password validation 
        const isValidpassword= await bcryptjs.compare(password,user.password)
        if(!isValidpassword){
            return NextResponse.json({error:"wrong password check your credentials"},{status:400})
        }
          
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }

        // const responce=await jwt.sign(
        //     tokenData,process.env.TOKEN_SECRET,
        //     {expiresIn:"1d"}
        // )
         const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

       const responce=NextResponse.json({
        message:"Logged In users Successfully",
        success: true
       })

       responce.cookies.set("token",token,{
        httpOnly:true
       })

       return responce
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}