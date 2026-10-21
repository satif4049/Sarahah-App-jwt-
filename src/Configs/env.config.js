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
       access_token_secrt: process.env.USER_ACCESS_TOKEN_SECRT,
       access_token_secrt_expires_in:
         process.env.USER_ACCESS_TOKEN_SECRT_EXPIRSE_IN,
       refresh_token_secrt: process.env.USER_REFRESH_TOKEN_SECRT,
       refresh_token_secrt_expires_in:
         process.env.USER_REFRESH_TOKEN_SECRT_EXPIRSE_IN,
     },
     admin: {
       access_token_secrt: process.env.ADMIN_ACCESS_TOKEN_SECRT,
       access_token_secrt_expires_in:
         process.env.ADMIN_ACCESS_TOKEN_SECRT_EXPIRSE_IN,
       refresh_token_secrt: process.env.ADMIN_REFRESH_TOKEN_SECRT,
       refresh_token_secrt_expires_in:
         process.env.ADMIN_REFRESH_TOKEN_SECRT_EXPIRSE_IN,
     },
   },
   gcp: {
     gcp_clint_id: process.env.GCP_CLINT_ID,
   },
   redis: {
     url: process.env.REDIS_CLOUD_URL,
   },
   email: {
     user: process.env.EMAIL_USER,
     password: process.env.EMAIL_PASSWORD,
   },
 };

export default envConfig