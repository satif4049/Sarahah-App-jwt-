  import jwt from "jsonwebtoken"
  export const generateToken=(bayload, secrt , options)=>{
        return jwt.sign(bayload , secrt, options)
  }

  export const decodeToken = (token , secrt)=>{
    return jwt.verify(token , secrt)
  }