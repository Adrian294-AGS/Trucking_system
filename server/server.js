import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.static('upload'));

app.use("/", authRoute);
app.use("/admin", adminAuthRoute);
app.use("/truck", truckRoute);

app.listen(port, () => {
    console.log("server running http://localhost:5000");
});
