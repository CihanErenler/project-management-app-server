import express from "express";
import {
  handleLogin,
  handleRegister,
  handleCheckAuth,
} from "../controllers/auth.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const authRouter = express.Router();

authRouter.post("/login", asyncHandler(handleLogin));
authRouter.post("/register", asyncHandler(handleRegister));
authRouter.post("/check-auth", asyncHandler(handleCheckAuth));

export default authRouter;
