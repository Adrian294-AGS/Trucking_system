import { fetchUserInfo } from "../model/sqlQuery.js";

// getting user info
export const userInfo = async (req, res) => {
  const {UID} = req.user;
  try {
    const user = await fetchUserInfo(UID);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, messsage: "User Not Found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        username: user.username,
        photo: user.photo,
        role: user.role,
        email: user.email,
        phoneNumber: user.phone_number,
        message: "Successfully fetch user info",
      });
  } catch (error) {
    console.log("userInfo ERROR: ", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
