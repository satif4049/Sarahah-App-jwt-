import { Router } from "express";
import * as userServices from "./user.service.js"
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { authorize } from "../../Middlewares/authorization.middleware.js";
import { roleEnum } from "../../Common/Enum/user.enum.js";

const userController = Router();
// user
userController.get("/profile",authenticate, authorize([roleEnum.user]),async(req , res) => {
   
    const userProfile = await userServices.getUserProfileById(
      req.authUser,
    );
    res.json({ Message: "Get User Profile Successfuly ", User:userProfile});
});
// admin 
userController.get("/users", authenticate, authorize([roleEnum.admin]) ,async (req, res) => {
  const usersProfile = await userServices.getUsersProfile();
  res.json({ Message: "Get User Profile Successfuly ", usersProfile });
});

userController.patch("/updateprofile", authenticate,async (req, res) => {
 console.log(req.authUser);
 
  const { firstName, lastName, email, password, gender, age , phone} = req.body;
  const userProfile = await userServices.updateUserProfileById(
    req.authUser._id,
    { firstName, lastName, email, password, gender, age, phone },
  );
  res.json({ Message: "Update User Profile Successfuly ", User: userProfile });
});

userController.delete("/deleteprofile",authenticate, async (req, res) => {
  const userProfile = await userServices.deleteProfileById(req.authUser._id);
  res.json({ Message: "Delete User Profile Successfuly ", User: userProfile });
});



export default userController;



