import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const jwtAdminAuthenticator = (req, res, next) => {
    const token = req.headers.authorization;
    const accessToken = token && token.split(" ")[1];

    if(!accessToken){return res.status(401).json({success: false, message: "Unauthorized Access; Invalid Token"})};
    try {
        const decode = jwt.verify(accessToken, process.env.admin_access_token);
        if(!decode){
            return res.status(401).json({success: false, message: "Unauthorized Access; Admin Only"});
        }
        req.user = {
            accessToken: accessToken,
            UID: decode.UID,
            Role: decode.role
        };
        next();
    } catch (error) {
        console.log("jwtUserAuthenticator Error: ", error);
        return res.status(401).json({success: false, message: "Unauthorized Access"});
    }
}