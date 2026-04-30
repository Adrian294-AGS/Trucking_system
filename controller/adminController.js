import { fetchUserForLogin, fetchUserInfo } from "../model/sqlQuery.js";
import {
  adminGenerateAccessToken,
  adminGenerateRefreshToken,
} from "../services/signJwtToken.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const adminRedirectAuth = async (req, res) => {
  const { accessToken, UID, Role } = req.user;
  res.status(200).json({
    success: true,
    role: Role,
    accessToken: accessToken,
    message: "Success Sing In",
  });
};

export const adminSignIn = async (req, res) => {
  const { email, admin_password } = req.body;

  try {
    const admin = await fetchUserForLogin(email);
    if (!admin) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Email Does not Exist. Sign Up first",
        });
    }
    if (admin.role !== "Admin") {
      return res
        .status(403)
        .json({
          success: false,
          message: "This page is for authorized administrators only.",
        });
    }
    let isPasswordMatched = await bcrypt.compare(
      admin_password,
      admin.password,
    );
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong Password Try Again" });
    }

    const payload = {
      UID: admin.UID,
      email: admin.email,
      role: admin.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      adminGenerateAccessToken(payload),
      adminGenerateRefreshToken(payload),
    ]);

    res.cookie("refreshToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({
        success: true,
        accessToken: accessToken,
        role: admin.role,
        message: "Successfully Loged In",
      });
  } catch (error) {
    console.log("AdminSignIn ERROR: ", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// getting Admin info

export const adminInfo = async (req, res) => {
  const { accessToken, UID, Role } = req.user;
  try {
    const adminInfo = await fetchUserInfo(UID);
    if (!adminInfo) {
      return res
        .status(404)
        .json({ success: false, message: "Admin Not Found" });
    }
    return res.status(200).json({
      success: true,
      username: adminInfo.username,
      photo: adminInfo.photo,
      role: adminInfo.role,
      email: adminInfo.email,
      phoneNumber: adminInfo.phone_number,
      message: "Successfully fetch user info",
    });
  } catch (error) {
    console.log("adminInfo ERROR: ", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Getting a Access Token
export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if(!token){return res.status(401).json({success: false, message: "Unauthorized Access; Invalid Token"})};
  try {
    const admin = jwt.verify(token, process.env.admin_refresh_token);
    if(!admin){
      return res.status(401).json({success: false, message: "Unauthorized Access; Malformed Token"});
    }
    const payload = {UID: admin.UID, email: admin.email, role: admin.role};
    const accessToken = await adminGenerateAccessToken(payload);
    return res.status(200).json({success: true, accessToken});
  } catch (error) {
    console.log("refreshToken ERROR: ", error);
    return res.status(500).json({success: false, message: "Server Error"});
  }
};
