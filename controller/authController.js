import {
  fetchUserForSignup,
  insertToDatabase,
  insertToUserLog,
  fetchUserForLogin
} from "../model/sqlQuery.js";
import bcrypt from "bcryptjs";

// Creating Account
export const signUp = async (req, res) => {
  const { fullName, email, phoneNumber, password, confirmPassword } = req.body;

  try {
    const existingUser = await fetchUserForSignup(fullName, email);
    if (existingUser.length > 0) {
      return res
        .status(200)
        .json({ success: false, message: "Account Already Exists" });
    }

    if (password != confirmPassword) {
      return res
        .status(200)
        .json({ success: false, message: "Passwrod do not Matched" });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    const userInput = {
      username: fullName,
      password: hashedPassword,
      email: email,
      phone_number: phoneNumber,
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
        if(!isEmailExist){
            
        }
    } catch (error) {
        console.log("Sign In Error: ", error);
        return res.status(500).json({success: false, message: "Server Error"});
    }
}
