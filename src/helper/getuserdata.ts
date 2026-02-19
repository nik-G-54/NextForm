// user ,NextResponce,jwt,bycrpt,
import bcrypt from "bcryptjs";
import User from "../models/usermodel";
import { NextRequest,NextResponse } from "next/server";
import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const getuserData=(request:NextRequest)=>{

    try {
          const token =request.cookies.get("token")?.value || ""

          const decodedtoken=jwt.verify(token,process.env.TOKEN_SECRET!,)
          return decodedtoken

    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
                 
}
