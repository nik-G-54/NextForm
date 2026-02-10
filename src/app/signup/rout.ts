import {connect} from '@/src/dbConfig/dbconfig'
import User from '@/src/models/usermodel'
import { NextResponse,NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';
import { SendEmail } from '@/src/helper/mailer';

connect();

export async function POST(request:NextRequest){
    try{
      
        const reqBody=request.json()
        const {username,email,password}=reqBody
        console.log(reqBody)

        //validation
        const user=await User.findone({email})

        if(user){
            return NextResponse.json({error:"user already exist"},
                {status:400}
            )
        }


        const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
// here we pass two parameter int he hash

const newuser=new User({
    username,
    email,
    password:hashedPassword
})

const savedUser= await newuser.save()
console.log(savedUser);

/// sending email 
    await SendEmail({email,emailType:"VERIFY",userTd:savedUser._id})

    }catch(error:any){
       return  NextResponse.json({error:error.message},
        {status:500}
       )
    }
}

// import {connect} from '@/src/dbConfig/dbconfig'
// import User from '@/src/models/usermodel'
// import { NextResponse,NextRequest } from 'next/server'
// import bcrypt from 'bcryptjs';
// import { SendEmail } from '@/src/helper/mailer';

// connect();

// export async function POST(request:NextRequest){
//     try{
      
//         const reqBody=request.json()
//         const {username,email,password}=reqBody
//         console.log(reqBody)

//         //validation
//         const user=await User.findone({email})

//         if(user){
//             return NextResponse.json({error:"user already exist"},
//                 {status:400}
//             )
//         }


//         const salt = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(password, salt);
// // here we pass two parameter int he hash

// const newuser=new User({
//     username,
//     email,
//     password:hashedPassword
// })

// const savedUser= await newuser.save()
// console.log(savedUser);

// /// sending email 
//     await SendEmail({email,emailType:"VERIFY",userTd:savedUser._id})

//     }catch(error:any){
//        return  NextResponse.json({error:error.message},
//         {status:500}
//        )
//     }
// }

