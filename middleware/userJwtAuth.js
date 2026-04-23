import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Namespace } from "socket.io";

dotenv.config();

export const jwtUserAuthenticator = (req, res, next) => {
    const accessToken = res.cookies.accessToken;

    if(!accessToken){return res.status(401).json({success: false, message: " Unauthorized Access; Invalid Token"})};
    try {
        const decode = jwt.verify(accessToken, process.env.user_access_token);
        req.user = decode.UID;
        next();
    } catch (error) {
        console.log("jwtUserAuthenticator Error: ", error);
        return res.status(500).json({success: false, message: "Server Error"});
    }
}