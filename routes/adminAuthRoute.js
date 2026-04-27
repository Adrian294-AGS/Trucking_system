import { jwtAdminAuthenticator } from "../middleware/adminJwtAuth.js";
import express from "express";
import { adminRedirectAuth, adminSignIn } from "../controller/adminController.js";

const adminAuthRoute = express.Router();

adminAuthRoute.get("/adminRedirectAuth", jwtAdminAuthenticator, adminRedirectAuth);
adminAuthRoute.post("/signIn", adminSignIn);

export default adminAuthRoute;