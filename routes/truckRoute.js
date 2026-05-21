import express from "express";
import { fetchAllTrucks, fetchAvailableTrucks, rentTruck, getOrders, editTruck, deleteTruck, addTruck } from "../controller/truckController.js";
import { jwtUserAuthenticator } from "../middleware/userJwtAuth.js";
import { deleteOrder } from "../controller/adminController.js";
import upload from "../middleware/truckPhoto.js";

const truckRoute = express.Router();

truckRoute.get("/fetchAllTrucks", jwtUserAuthenticator, fetchAllTrucks);
truckRoute.get("/fetchAvailableTrucks", jwtUserAuthenticator, fetchAvailableTrucks);
truckRoute.post("/rentTruck", jwtUserAuthenticator, rentTruck);
truckRoute.get("/getOrders", jwtUserAuthenticator, getOrders);
truckRoute.delete("/deleteOrder", jwtUserAuthenticator, deleteOrder);
truckRoute.put("/editVehicle", jwtUserAuthenticator, editTruck);
truckRoute.delete("/deleteTruck/:truck_id", jwtUserAuthenticator, deleteTruck);
truckRoute.post("/addTruck", jwtUserAuthenticator, upload.single('photo'), addTruck);

export default truckRoute;

