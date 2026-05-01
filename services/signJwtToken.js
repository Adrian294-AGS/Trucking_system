import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userGenerateAccessToken = (input) => {
    return jwt.sign(input, process.env.user_access_token, {expiresIn: "30m"});
};

export const userGenerateRefreshToken = (input) => {
    return jwt.sign(input, process.env.user_refresh_token, {expiresIn: "7d"});
};
