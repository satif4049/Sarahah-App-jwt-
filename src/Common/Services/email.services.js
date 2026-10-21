import envConfig from "../../Configs/env.config.js";
import { ApplicationException } from "../../Utils/Security/ErrorException/error.exception.js";
import { emailTransporter } from "../Clints/email.clint.js";
import { EventEmitter } from "node:events";
const {email} = envConfig
export const sendEmail = async ({
  to,
  subject = "No Replay",
  message,
  attachments = [],
}) => {
    if (!message && !attachments?.length) throw ApplicationException({message:"Message or Attachments are required"})
        
    
  try {
    const info = await emailTransporter.sendMail({
      from: ` "Sarahah App"<${email.user}>`, // sender address
      to, // list of recipients
      subject, // subject line

      html: message, // HTML body
      attachments,
    });

    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (err) {
    console.error("Error while sending mail:", err);
    throw ApplicationException({message:"Error while sending mail:" , err})
    
  }
};



export const eventEmitter = new EventEmitter()
eventEmitter.on("sendEmail",(  { to, subject = "No Replay", message, attachments=[] })=>{
    sendEmail({
      to,
      subject,
      message,
      attachments
    });

    console.log("data recived successfuly");
    
});