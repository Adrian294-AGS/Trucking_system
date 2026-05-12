import { fetchOrders, updateTblTransac, deleteOrders, updateTruck, fetchAllTrucks } from "../model/sqlQuery.js";

export const getOrdersForAdmin = async (req, res) => {
  try {
    const orders = await fetchOrders();
    return res.status(200).json({success: true, vehicle: orders});
  } catch (error) {
    console.log("getOrdersForAdmin ERROR: ", error);
    return res.status(500).json({success: false, message: "SERVER ERROR"});
  }
};

export const updateOrders = async (req, res) => {
  const { transac_id, pickupDate, returnDate, pickupLocation, notes, amount, status} = req.body;
  const up = {
    amount,
    pickup_date: pickupDate,
    return_date: returnDate,
    status,
    pickup_location: pickupLocation,
    note: notes
  };
  try {
    await updateTblTransac(transac_id, up);
    return res.status(201).json({success: true, message: "Successfully Updated"});
  } catch (error) {
    console.log("updateOrders ERROR: ", error);
    return res.status(500).json({success: false, message: "Server Error"});
  }
};

export const deleteOrder = async (req, res) => {
  const { trip_id, truck_id} = req.body;
  try {
    await deleteOrders(trip_id);
    await updateTruck("tbl_truck", {on_trip: 0}, truck_id);
    return res.status(200).json({success: true, message: "Successfully Deleted"});
  } catch (error) {
    console.log("deleteERROR: ", error);
    return res.status(500).json({success: false, message: "Server Error"});
  }
};

export const fetchAllTruck = async (req, res) => {
  try {
    const trucks = await fetchAllTrucks();
    return res.status(200).json({success: true, trucks});
  } catch (error) {
    console.log("fetchAllTruck ERROR: ", error);
    return res.status(500).json({success: false, message: "SERVER ERROR"});
  }
}