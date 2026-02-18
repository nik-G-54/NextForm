import mongoose from "mongoose";



export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!) // here we use ! it means we are sure somthing is comming this is required in typescript  
        const conect=mongoose.connection

        conect.on('connected',()=>{
            console.log("mongoDb connected succesfully")
        })
        conect.on('error',(err)=>{
            console.log("Mongodb connection error," + err)

            process.exit();
        })

    }
    catch(error){
        console.log("somthing went wrong,MongoDb not connect  "+ error );
        
    }
}