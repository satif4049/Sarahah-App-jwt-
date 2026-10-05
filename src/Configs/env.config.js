import dotenv from "dotenv"


dotenv.config({path:[`.${process.env.NODE_ENV}.env` , '.env']})


 const envConfig = {
   database: {
     db_uri_local: process.env.DB_URI_LOCAL,
   },
   encryption: {
     key: process.env.ENCRYPTION_KEY,
     iV: parseInt(process.env.IV_LENGTH),
   },
   jwt: {
     user: {
       access_token_secrt: process.env.ACCESS_TOKEN_SECRT,
     },
   },
 };

export default envConfig