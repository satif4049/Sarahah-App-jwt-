import { ApplicationException } from "../Utils/Security/ErrorException/error.exception.js";
export const validationMiddleWare= (schema)=>{

    return (req , res , next)=>{
         const validationResult = schema.safeParse({
           body: req.body,
           params:req.params,
           query :req.query
         });
           if (!validationResult.success) {
             ApplicationException({
               message: "Validation Error",
               issues: validationResult.error.issues,
             });
           }
           req.validateData = validationResult.data
            next()
        
    } 
}