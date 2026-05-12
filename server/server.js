import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "../routes/authRoute.js";
import truckRoute from "../routes/truckRoute.js";
import adminRoute from "../routes/adminRoute.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "../services/socketHandler.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

app.use(cors({
  origin: "http://192.168.100.90:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.static("upload"));
app.use(cookieParser());

const io = new Server(server, {
  cors: {
    origin: "http://192.168.100.90:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  socketHandler(io, socket);
});

app.use("/api/user", authRoute);
app.use("/api/truck", truckRoute);
app.use("/api/admin", adminRoute);

server.listen(port, () => {
  console.log("server running http://localhost:5000");
});
