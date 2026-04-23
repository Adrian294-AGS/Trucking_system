import express from "express";
import { signUp, signIn, logOut } from "../controller/authController.js";
import { jwtUserAuthenticator } from "../middleware/userJwtAuth.js";

const authRoute = express.Router();

authRoute.post("/signUp", signUp);
authRoute.post("/signIn", signIn);
authRoute.post("/logOut", logOut);

export default authRoute;