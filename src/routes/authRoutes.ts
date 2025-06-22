import { Router } from "express";
import AuthController from "../controllers/authController";

export const authRouter = Router();
const authController = AuthController.getInstance();

authRouter.post("/signin", authController.login.bind(authController));
authRouter.post("/signup", authController.register.bind(authController));