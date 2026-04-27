import { fetchUserForLogin } from "../model/sqlQuery.js";
import { adminGenerateAccessToken, adminGenerateRefreshToken } from "../services/signJwtToken.js";
import bcrypt from "bcryptjs";

export const adminRedirectAuth = async (req, res) => {
  const {accessToken, UID, Role} = req.user;
  res.status(200).json({
    success: true,
    role: Role,
    accessToken: accessToken,
    message: "Success Sing In",
  });
};

export const adminSignIn = async (req, res) => {
  const {email, admin_password} = req.body;

  try {
    const admin = await fetchUserForLogin(email);
    if(!admin){
      return res.status(404).json({success: false, message: "Email Does not Exist. Sign Up first"});
    }
    if(admin.role !== "Admin"){
      return res.status(403).json({success: false, message: "This page is for authorized administrators only."});
    }
    let isPasswordMatched = await bcrypt.compare(admin_password, admin.password);
    if(!isPasswordMatched){
      return res.status(401).json({success: false, message: "Wrong Password Try Again"});
    }

    const payload = {
      UID: admin.UID,
      email: admin.email,
      role: admin.role,
    };

    const [accessToken, refreshToken] = await Promise.all([adminGenerateAccessToken(payload), adminGenerateRefreshToken(payload)]);

    res.cookie("refreshToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge:  7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({success: true, accessToken: accessToken, role: admin.role});
  } catch (error) {
    console.log("AdminSignIn ERROR: ", error);
    return res.status(500).json({success: false, message: "Server Error"});
  }

}
