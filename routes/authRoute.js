import express from "express";
import { signUp, signIn, logOut, getUserInfo } from "../controller/authController.js";
import { jwtUserAuthenticator } from "../middleware/userJwtAuth.js";

const authRoute = express.Router();

authRoute.post("/signUp", signUp);
authRoute.post("/signIn", signIn);
authRoute.post("/logOut", logOut);
authRoute.get("/info", jwtUserAuthenticator, getUserInfo);

export default authRoute;