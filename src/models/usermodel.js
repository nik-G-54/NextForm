import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";


const userScheema= new mongoose.Schema({
    username:{
        type:String,
        require:[true,"please provide a user name "],
        unique:true
    },
    email:{
     type:String,
     required:[true,"please provide a email"],
    },
    password:{
        type:String,
        required:true,

    },
    isvarified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiery:Date,
    verifiedToken:String,
    verifyTokenExpiery:Date

})

const User = mongoose.model.users || mongoose.model("users",userScheema);

export default User;