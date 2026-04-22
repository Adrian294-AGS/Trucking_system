import express from "express";
import { signUp, signIn } from "../controller/authController.js";

const Route = express.Router();

Route.post("/signUp", signUp);
Route.post("/signIn", signIn);

export default Route;