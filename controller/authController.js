import {
  fetchUserForSignup,
  insertToDatabase,
  insertToUserLog,
  fetchUserForLogin,
  fetchTotalTruckToDatabase,
} from "../model/sqlQuery.js";
import bcrypt from "bcryptjs";
import {
  userGenerateAccessToken,
  userGenerateRefreshToken,
  adminGenerateAccessToken,
  adminGenerateRefreshToken,
} from "../services/signJwtToken.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Creating Account
export const signUp = async (req, res) => {
  const { full_name, email, phone, password, confirm_password } = req.body;

  try {
    const existingUser = await fetchUserForSignup(full_name, email);
    if (existingUser.length > 0) {
      return res
        .status(200)
        .json({ success: false, message: "Account Already Exists" });
    }

    if (password != confirm_password) {
      return res
        .status(401)
        .json({ success: false, message: "Passwrod do not Matched" });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    const userInput = {
      username: full_name,
      password: hashedPassword,
      email: email,
      phone_number: phone,
    };

    const insResult = await insertToDatabase("tbl_users", userInput);

    if (insResult) {
      const log = {
        UID: insResult.insertId,
        email: email,
        action: "SignUp",
        status: "Success",
      };
      await insertToUserLog(log);
      return res
        .status(201)
        .json({ success: true, message: "Success Sign Up" });
    }
  } catch (error) {
    console.log("signUp Error: ", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Sign In Account

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isEmailExist = await fetchUserForLogin(email);
    if (!isEmailExist) {
      return res.status(404).json({
        success: false,
        message: "Email Does not Exist. Sign Up first",
      });
    }
    let isPasswordMatched = await bcrypt.compare(
      password,
      isEmailExist.password,
    );
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong Password Try Again" });
    }
    const payload = { UID: isEmailExist.UID, email: isEmailExist.email };
    const [accessToken, refreshToken] = await Promise.all([
      userGenerateAccessToken(payload),
      userGenerateRefreshToken(payload),
    ]);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      role: isEmailExist.role,
      accessToken: accessToken,
      message: "Success Sing In",
    });
  } catch (error) {
    console.log("Sign In Error: ", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// logOUt part
export const logOut = async (req, res) => {
  try {
    res.clearCookie("refreshToken"); 
    return res.status(200).json({success: true, message: "Successfully Logged out" });
  } catch (error) {
    console.log("Log out Error: ", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Refresh Token Part

export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if(!token){return res.status(401).json({success: false, message: "Unauthorized Access; Invalid Token"})};
  try {
    const user = jwt.verify(token, process.env.user_refresh_token);
    if(!user){
      return res.status(401).json({success: false, message: "Unauthorized Access; Malformed Token"});
    }
    const payload = {UID: user.UID, email: user.email};
    const accessToken = await userGenerateAccessToken(payload);
    return res.status(200).json({success: true, accessToken});
  } catch (error) {
    console.log("refreshToken ERROR: ", error);
  }
};
