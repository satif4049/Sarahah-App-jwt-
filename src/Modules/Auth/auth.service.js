import { encryption } from "../../Utils/Security/encryption.security.js";
import { compareTwoHashs, hash } from "../../Utils/Security/hash.security.js";
import UserRepository from "../../DB/Repositories/user.repository.js";
import { ConfilectException, UnAuthorizedException } from "../../Utils/Security/ErrorException/error.exception.js";
import envConfig from "../../Configs/env.config.js";
import { generateToken } from "../../Utils/token.utils.js";
const userRepo = new UserRepository()

export const signUp = async (body) => {
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    age,
    phone,
    confirmPassword,
    role,
  } = body;
  //  User.findOne({ email });
  const isEmailExist = await userRepo.findOneDocument({ email });
  if (isEmailExist)
       throw ConfilectException("Email Already Exist");

  // Encryption
  let encryptedNumber;
  if (phone) encryptedNumber = encryption(phone);

  const passwordHashing = await hash(password);
  console.log("BEFORE CREATE:",passwordHashing);
  // await User.create
  return await userRepo.creatDocument({
    firstName,
    lastName,
    email,
    password: passwordHashing,
    confirmPassword,
    gender,
    age,
    phone: encryptedNumber || undefined,
    role,
  });
};

export const signIn = async (body) => {
  const { email, password  } = body;
  const user = await userRepo.findOneDocument({ email });
//   console.log( user);
  
        if (!user)
            throw UnAuthorizedException(" Inavlid Email Or Password");
          console.log("PASSWORD FROM DB:", user.password);
          console.log("PASSWORD FROM REQUEST:", password);
    const isPasswordMatched = await compareTwoHashs(user.password , password);
    console.log(isPasswordMatched);
    
        if (!isPasswordMatched) 
            throw UnAuthorizedException(" Inavlid Email Or Password");
  const token = generateToken(
    { userId: user._id, email: user.email, role: user.role },
    envConfig.jwt.user.access_token_secrt,
    {
      expiresIn: "1h", 
    },
  );
    console.log(token);
     return { message: "SignIn Successfuly", token };

}; 




