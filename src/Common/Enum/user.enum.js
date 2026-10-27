import { application } from "express";

export const genderEnum = {
  male: "male",
  female: "female",
};

export const roleEnum = {
 user:"user",
 admin:"admin"

};

export const providersEnum={
  google:"google",
  system:"system"
}

export const emailOtpEXpiration = 300

export const allowedExtension = {
  image: ["png" , "jpeg"],
  video:["mp4"],
  application:["xlxs" , "pdf"]

}