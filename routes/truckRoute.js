import express from "express";
import { fetchAllTrucks, fetchAvailableTrucks } from "../controller/truckController.js";
import { jwtUserAuthenticator } from "../middleware/userJwtAuth.js";

const truckRoute = express.Router();

truckRoute.get("/fetchAllTrucks", jwtUserAuthenticator, fetchAllTrucks);
truckRoute.get("/fetchAvailableTrucks", jwtUserAuthenticator, fetchAvailableTrucks);

export default truckRoute;

