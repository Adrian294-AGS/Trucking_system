import { fetchUserLogs } from "../model/sqlQuery.js";

export const getUserLog = async (req, res) => {
    try {
        const log = await fetchUserLogs();
        return res.status(200).json({success: true, log});
    } catch (error) {
        console.log("getUserLog ERROR: ", error);
        return res.status(500).json({success: false, message: "SERVER ERROR: "});
    }
} 