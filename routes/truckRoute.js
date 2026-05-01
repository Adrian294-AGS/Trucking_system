import express from "express";
import { fetchAllTrucks } from "../controller/truckController.js";
import { jwtUserAuthenticator } from "../middleware/userJwtAuth.js";

const truckRoute = express.Router();

truckRoute.get("/fetchAllTrucks", jwtUserAuthenticator, fetchAllTrucks);

export default truckRoute;

