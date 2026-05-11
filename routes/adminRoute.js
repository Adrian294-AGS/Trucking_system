import express from "express";
import { checkRole } from "../middleware/checkRole.js";
import { jwtUserAuthenticator } from "../middleware/userJwtAuth.js";
import { getOrdersForAdmin, updateOrders,  } from "../controller/adminController.js";

const adminRoute = express.Router();


adminRoute.get("/getOrders", jwtUserAuthenticator, checkRole, getOrdersForAdmin);
adminRoute.put("/editOrders", jwtUserAuthenticator, checkRole, updateOrders);
adminRoute.delete("/deleteOrder", jwtUserAuthenticator, checkRole, )

export default adminRoute;