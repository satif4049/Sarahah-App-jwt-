
import bcrypt from "bcrypt";

export const hash = (plaintext) => {
    return bcrypt.hash(plaintext , 10)
}


export const compareTwoHashs = (hash,plaintext)=>{
    return bcrypt.compare(hash,plaintext)
}


