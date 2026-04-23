import { jwtAdminAuthenticator } from "../middleware/adminJwtAuth.js";
import express from "express";
import { adminAuth } from "../controller/adminController.js";

const adminAuthRoute = express.Router();

adminAuthRoute.post("/adminAuth", jwtAdminAuthenticator, adminAuth);

export default adminAuthRoute;