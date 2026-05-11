import { fetchOrders } from "../model/sqlQuery.js";

export const getOrdersForAdmin = async (req, res) => {
  try {
    const orders = await fetchOrders();
    return res.status(200).json({success: true, vehicle: orders});
  } catch (error) {
    console.log("getOrdersForAdmin ERROR: ", error);
    return res.status(500).json({success: false, message: "SERVER ERROR"});
  }
}