import { connect } from "@/src/dbConfig/dbconfig";
import User from "@/src/models/usermodel"; 
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getuserData } from "@/src/helper/getuserdata";


export  async function POST(request:NextRequest){
                const UserId =  await getuserData(request)
                const user= await User.findOne({_id:UserId}).select("-password")

                return NextResponse.json({
                    message:"User found",
                    status:true,
                    data:user
                })

}