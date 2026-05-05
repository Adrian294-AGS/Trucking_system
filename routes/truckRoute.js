import express from "express";
import { fetchAllTrucks, fetchAvailableTrucks, rentTruck, getOrders } from "../controller/truckController.js";
import { jwtUserAuthenticator } from "../middleware/userJwtAuth.js";

const truckRoute = express.Router();

truckRoute.get("/fetchAllTrucks", jwtUserAuthenticator, fetchAllTrucks);
truckRoute.get("/fetchAvailableTrucks", jwtUserAuthenticator, fetchAvailableTrucks);
truckRoute.post("/rentTruck", jwtUserAuthenticator, rentTruck);
truckRoute.get("/getOrders", jwtUserAuthenticator, getOrders);

export default truckRoute;

