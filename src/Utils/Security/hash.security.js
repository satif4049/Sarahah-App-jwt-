import * as argon2 from "argon2"

export const hash = (plaintext) => {
    return argon2.hash(plaintext)
}


export const compareTwoHashs = (hash,plaintext)=>{
    return argon2.verify(hash,plaintext)
}