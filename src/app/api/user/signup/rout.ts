import {connect} from '@/src/dbConfig/dbconfig'  // in next at every time we have to import this to tell that we are connect to db
import User from '@/src/models/usermodel'
import { NextResponse,NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';
import { SendEmail } from '@/src/helper/mailer';

connect();

export async function POST(req:NextRequest){
    try{
      
        const reqBody=req.json()
        const {username,email,password}=reqBody
        console.log(reqBody)

        //validation
        const user=await User.findone({email})

        if(user){
            return NextResponse.json({error:"user already exist"},
                {status:400}
            )
        }


        //Q- what is salt what is its function 

        const salt = await bcrypt.genSalt(10);// here we generate a random hash word salt1 = X7s9@
const hashedPassword = await bcrypt.hash(password, salt);   //here only we add this salt with  password  to make it unpridectable 
//  salt2 = L2mK!
// hash("nikhil123" + salt2) → zyx789
// 
// here we pass two parameter int he hash

const newuser=new User({
    username,
    email,
    password:hashedPassword
})
 console.log(newuser);
const savedUser= await newuser.save()
console.log(savedUser);

/// sending email 
    await SendEmail({email,emailType:"VERIFY",userId:savedUser._id})

    }catch(error:unknown){
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

