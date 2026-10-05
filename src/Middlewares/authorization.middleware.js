import UserRepository from "../DB/Repositories/user.repository.js";
import { ApplicationException } from "../Utils/Security/ErrorException/error.exception.js";
import envConfig from "../Configs/env.config.js";
import { decodeToken } from "../Utils/token.utils.js";
const userRepo = new UserRepository();

export const authenticate = async (req , res ,next)=>{
   const { authorization } = req.headers;
   if (!authorization) 
            throw ApplicationException({message:"Authorization header is missing"})
    const [prefix , token]= authorization.split(" ");
    if (prefix !== "Bearer" || !token) 
            throw ApplicationException({message:" Invalid Autherization header format"})
    const decodeData = decodeToken(token, envConfig.jwt.user.access_token_secrt); 
  const user = await userRepo.findUserProfileByIdDocument(decodeData.userId)
   if (!user) throw NotFoundException("User  Not Found");
    req.authUser = user
    next()

}