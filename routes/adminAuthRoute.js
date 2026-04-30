import { jwtAdminAuthenticator } from "../middleware/adminJwtAuth.js";
import express from "express";
import {adminSignIn, adminInfo, refreshToken } from "../controller/adminController.js";
import { logOut } from "../controller/authController.js";

const adminAuthRoute = express.Router();

adminAuthRoute.post("/signIn", adminSignIn);
adminAuthRoute.get("/getUserInfo", jwtAdminAuthenticator, adminInfo);
adminAuthRoute.post("/logOut", logOut);
adminAuthRoute.get("/getToken", refreshToken);

export default adminAuthRoute;