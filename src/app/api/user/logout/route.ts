import { connect} from "@/src/dbConfig/dbconfig";
import User from "@/src/models/usermodel"; 
import { NextRequest,NextResponse } from "next/server";


export async function GET(){
       try {
              const responce=NextResponse.json({message:"logoutsuccesfull",
                   sucess:true
              })

              responce.cookies.set("token","", { httpOnly: true, expires: new Date(0) 
        })

      return responce
       } catch (error) {
        NextResponse.json({error:error.message},{status:500})
       }
}

//message of logout 
//responce ke sath cokkies me empty tokenn 