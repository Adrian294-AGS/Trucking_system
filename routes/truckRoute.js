import express from "express";
import { fetchAllTrucks, fetchAvailableTrucks } from "../controller/truckController.js";
import { jwtUserAuthenticator } from "../middleware/userJwtAuth.js";

const truckRoute = express.Router();

truckRoute.get("/fetchAllTrucks", fetchAllTrucks);
truckRoute.get("/availableTrucks", jwtUserAuthenticator, fetchAvailableTrucks);

