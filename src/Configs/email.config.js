
import envConfig from "./env.config.js";
const {email} = envConfig
console.log({email});

export const emailConfig = {
  service: "gmail",
  auth: {
    user: email.user,
    pass:email.password,
  },
};