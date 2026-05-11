import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const jwtUserAuthenticator = (req, res, next) => {
    const token = req.headers.authorization;
    const accessToken = token && token.split(" ")[1];
   
    if(!accessToken){return res.status(401).json({success: false, message: " Unauthorized Access; Invalid Token"})};
    try {
        const decode = jwt.verify(accessToken, process.env.user_access_token);
        req.user = decode;
        next();
    } catch (error) {
        console.log("jwtUserAuthenticator Error: ", error);
        return res.status(500).json({success: false, message: "Server Error"});
    }
}