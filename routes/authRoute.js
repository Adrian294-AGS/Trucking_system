import express from "express";
import { signUp, signIn, logOut, refreshToken} from "../controller/authController.js";
import { jwtUserAuthenticator } from "../middleware/userJwtAuth.js";
import { userInfo, getNotif, markRead, markAllAsRead } from "../controller/userInfoController.js";

const authRoute = express.Router();

authRoute.post("/signUp", signUp);
authRoute.post("/signIn", signIn);
authRoute.post("/logOut", logOut);
authRoute.get("/getUserInfo", jwtUserAuthenticator, userInfo);
authRoute.get("/getToken", refreshToken);
authRoute.get("/getNotif", jwtUserAuthenticator, getNotif);
authRoute.put("/markNotif/:notif_id", jwtUserAuthenticator, markRead);
authRoute.put("/markAllNotif", jwtUserAuthenticator, markAllAsRead);
// authRoute.get("/info", jwtUserAuthenticator, getUserInfo);

export default authRoute;