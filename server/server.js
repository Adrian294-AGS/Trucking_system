import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "../routes/authRoute.js";
import adminAuthRoute from "../routes/adminAuthRoute.js";
import truckRoute from "../routes/truckRoute.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: "http://192.168.100.90:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.static("upload"));
app.use(cookieParser());


app.use("/api/user", authRoute);
app.use("/api/admin", adminAuthRoute);
app.use("/api/truck", truckRoute);

app.listen(port, () => {
  console.log("server running http://localhost:5000");
});
