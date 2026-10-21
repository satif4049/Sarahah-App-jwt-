import "./Configs/env.config.js"
import express from "express";
import dpConnection from "./DB/dp.connection.js";
import authController from "./Modules/Auth/auth.controller.js";
import userController from "./Modules/User/user.controller.js";
import globalErrorHandler from "./Middlewares/golobal-error-handler-middleware.js";
import  cors from "cors"
import { redisConnection } from "./Common/Clints/redis.clint.js";
import { emailTransporter } from "./Common/Clints/email.clint.js";
import { sendEmail } from "./Common/Services/email.services.js";
import { compareTwoHashs } from "./Utils/Security/hash.security.js";
const port = process.env.PORT;
const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
  }),
  express.json(),
);

app.use("/api/auth", authController);
app.use("/api/user", userController);



dpConnection();
redisConnection();
app.get("/", (req, res) => {
  res.json({ Message: "hello in server" });
});


app.use((req, res) => {
  res.status(404).json({ Message: "Invalid EndPoint" });
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server Run On Port ${port}`);
});
