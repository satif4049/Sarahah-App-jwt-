import mongoose from "mongoose";
import { dbConfig } from "../Configs/db.config.js";

const dpConnection = async ()=>{
    try {
        await mongoose.connect(dbConfig);
        console.log(process.env.DB_URI_LOCAL);
        
        console.log("DB Connection Successfuly");
        
    } catch (error) {
        console.log("DB Connection Faild" , error);
        
    }
}

export default dpConnection;