import "./Configs/env.config.js"
import express from "express";
import dpConnection from "./DB/dp.connection.js";
import authController from "./Modules/Auth/auth.controller.js";
import userController from "./Modules/User/user.controller.js";
import globalErrorHandler from "./Middlewares/golobal-error-handler-middleware.js";
const port = process.env.PORT;
const app = express();
app.use(express.json());

app.use("/api/auth", authController);
app.use("/api/user", userController);



dpConnection();
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
