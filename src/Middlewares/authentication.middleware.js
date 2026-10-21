import { tokenTypeEnum} from "../Common/Enum/token.enum.js";
import UserRepository from "../DB/Repositories/user.repository.js";
import { ApplicationException } from "../Utils/Security/ErrorException/error.exception.js";
import { decodeToken} from "../Utils/token.utils.js";
const userRepo = new UserRepository();

export const authenticate = async (req , res ,next)=>{
   const { authorization } = req.headers;
   if (!authorization) 
            throw ApplicationException({message:"Authorization header is missing"})

    const [prefix , token]= authorization.split(" ");
    if (prefix !== "Bearer" || !token) 
            throw ApplicationException({message:" Invalid Autherization header format"})
    const {user , tokenData} = await decodeToken({token , tokenType:tokenTypeEnum.Access_Token})
 
    req.authUser = user
    req.accessTokenData = tokenData
    next()

}