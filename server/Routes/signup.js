import express from "express";
import { addUser, signIn } from "../controller/signup.js";
import auth from "../middleware/auth.js";

const signUpRouter = express.Router();

signUpRouter.post("/", addUser);
signUpRouter.post("/signIn", signIn);
signUpRouter.post("/authorization", auth);

export default signUpRouter;
