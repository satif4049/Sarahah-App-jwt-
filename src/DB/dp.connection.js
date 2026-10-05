import mongoose from "mongoose";
import envConfig from "../Configs/env.config.js";

const dpConnection = async ()=>{
    try {
        await mongoose.connect(envConfig.database.db_uri_local);
        console.log(process.env.DB_URI_LOCAL);
        
        console.log("DB Connection Successfuly");
        
    } catch (error) {
        console.log("DB Connection Faild" , error);
        
    }
}

export default dpConnection;