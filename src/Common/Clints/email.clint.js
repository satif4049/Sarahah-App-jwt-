import nodemailer from "nodemailer";
import { emailConfig } from "../../Configs/email.config.js";
export const emailTransporter = nodemailer.createTransport(emailConfig)

