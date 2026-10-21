import { UnAuthorizedException } from "../Utils/Security/ErrorException/error.exception.js";

export const authorize = (allowedRole)=>{
    return (req , res , next)=>{
        const loginUserRole = req.authUser.role;
        console.log({
            loginUserRole,
            allowedRole
        });
        
        if (!allowedRole.includes(loginUserRole)) 
            throw UnAuthorizedException("User Not Authorized To Access This Resource")
        
        next()
    }
    
}

/**
*user login -- token
* token - authentication middleware - user profile - user data - req-authUser[role]
* loginUserRole = req-authUser.role
* 
* allowedRole = ["admin" , "user"] --- dynamic
*/
