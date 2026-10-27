import { Router } from "express";
import * as userServices from "./user.service.js"
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { authorize } from "../../Middlewares/authorization.middleware.js";
import { roleEnum } from "../../Common/Enum/user.enum.js";
import { multerUpload } from "../../Middlewares/multer.middleware.js";
import { fileTypeFromFile } from "file-type";
import { ApplicationException } from "../../Utils/Security/ErrorException/error.exception.js";
import { magicNumberMiddleware } from "../../Middlewares/magic-number.middleware.js";
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

userController.patch("/profile-picture", authenticate , multerUpload({desiredPath:"profile"}).single("imageProfile"), magicNumberMiddleware, async (req, res) => {
    // const resulte = await fileTypeFromFile(req.file.path)
    const file = req.file
     if (!file) {
       throw ApplicationException({
         message: "Please uploud a profile picture",
       });
     }
    const resulte = await userServices.uploudProfilePicture(
      file,
      req.authUser,
    );
    res.json({ Message: "Profile picture uplouded Successfuly ", data: resulte});
  },
);

export default userController;



