import mongoose from "mongoose"

const connectionURI = "mongodb+srv://sandesh:sandyshades@cluster0.6987g.mongodb.net/"

export async function connectToDB(){
   try {
    return await mongoose.connect(connectionURI).then(() => console.log("connection successfull")).catch((e)=> console.log("Could not connect to database", e))
   } catch (error) {
    return console.log(error, "Something went wrong while connecting to database")
   }
}