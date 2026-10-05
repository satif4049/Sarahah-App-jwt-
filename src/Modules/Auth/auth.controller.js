import { Router } from "express";
import * as authServices from "./auth.service.js"
import * as validators from "./auth.validation.js";
import { validationMiddleWare } from "../../Middlewares/zod-validation.middleware.js";
const authController = Router();


authController.post(
  "/signUp",
  validationMiddleWare(validators.signup),
  async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      age,
      phone,
      confirmPassword,
      role
    } = req.validateData.body;
    const resulte = await authServices.signUp({
      firstName,
      lastName,
      email,
      password,
      gender,
      age,
      phone,
      confirmPassword,
      role,
    });
    res.status(201).json({ Message: "User SignUP Successfuly ", resulte });
  },
);


authController.post("/signIn",validationMiddleWare(validators.login), async (req, res) => {
  const { email, password } = req.validateData.body;
  const token = await authServices.signIn({ email, password });

  res.status(201).json({ Message: "User SignIn Successfuly ", token});
});








export default authController;