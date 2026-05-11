import express from "express";
import { checkRole } from "../middleware/checkRole.js";
import { jwtUserAuthenticator } from "../middleware/userJwtAuth.js";
import { getOrdersForAdmin } from "../controller/adminController.js";

const adminRoute = express.Router();


adminRoute.get("/getOrders", jwtUserAuthenticator, checkRole, getOrdersForAdmin);


export default adminRoute;