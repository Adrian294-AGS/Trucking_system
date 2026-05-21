import { fetchUserInfo, retrieveNotif, updateNotif, updateAllNotif } from "../model/sqlQuery.js";

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
        UID: UID,
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

// Getting a Notification

export const getNotif = async (req, res) => {
  const { UID } = req.user;
  try {
    const notif = await retrieveNotif(UID);
    if(notif.length == 0) return res.status(404).json({success: false, message: "No Notification yet"});
    return res.status(200).json({success: true, notifInfo: notif});
  } catch (error) {
    console.log("gertNotif ERROR: ", error);
    return res.status(500).json({success: false, message: "SERVER ERROR"});
  }
};

export const markRead = async (req, res) => {
  const { notif_id } = req.params;
  try {
    const result = await updateNotif({isRead: 1}, notif_id);
    if(!result) return res.status(202).json({success: false});
    return res.status(200).json({success: true});
  } catch (error) {
    console.log("markRead ERROR: ", error);
    return res.status(500).json({success: false, message: "SERVER ERROR"});
  }
}

export const markAllAsRead = async (req, res) => {
  const { UID } = req.user;
  try {
    const result = await updateAllNotif(UID);
    if(!result){
      return res.status(202).json({success: false});
    }
    return res.status(200).json({success: true});
  } catch (error) {
    console.log("markRead ERROR: ", error);
    return res.status(500).json({success: false, message: "SERVER ERROR"});
  }
}