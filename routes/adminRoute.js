import express from "express";
import { checkRole } from "../middleware/checkRole.js";
import { jwtUserAuthenticator } from "../middleware/userJwtAuth.js";
import { getOrdersForAdmin, updateOrders,  deleteOrder, fetchAllTruck} from "../controller/adminController.js";
import { getUserLog } from "../controller/logController.js";

const adminRoute = express.Router();

adminRoute.get("/getOrders", jwtUserAuthenticator, checkRole, getOrdersForAdmin);
adminRoute.put("/editOrders", jwtUserAuthenticator, checkRole, updateOrders);
adminRoute.delete("/deleteOrder", jwtUserAuthenticator, checkRole, deleteOrder);
adminRoute.get("/fetchAllTruck", jwtUserAuthenticator, checkRole, fetchAllTruck);
adminRoute.get("/getUserLog", jwtUserAuthenticator, checkRole, getUserLog);

export default adminRoute;