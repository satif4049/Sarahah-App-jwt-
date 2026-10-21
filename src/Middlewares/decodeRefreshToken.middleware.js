import { tokenTypeEnum} from "../Common/Enum/token.enum.js";
import UserRepository from "../DB/Repositories/user.repository.js";
import { ApplicationException } from "../Utils/Security/ErrorException/error.exception.js";
import { decodeToken} from "../Utils/token.utils.js";
const userRepo = new UserRepository();

export const decodeRefreshToken = async (req , res ,next)=>{
   const {refreshtoken} = req.headers;
   if (!refreshtoken) 
            throw ApplicationException({message:"refreshtoken header is missing"})
  const [prefix, token] = refreshtoken?.trim().split(/\s+/) ?? [];
    if (prefix !== "Bearer" || !token) 
            throw ApplicationException({
              message: " Invalid  refreshtoken header format",
            });

    const {tokenData} = await decodeToken({token , tokenType:tokenTypeEnum.Refresh_Token})
   
    req.refreshTokenData = tokenData
    next()

}