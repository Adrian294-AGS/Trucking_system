import {
  fetchTotalTruckToDatabase,
  fetchAvailableTruck
} from "../model/sqlQuery.js";

// fetching all trucks for the preview page
export const fetchAllTrucks = async (req, res) => {
  try {
    const totalTruck = await fetchTotalTruckToDatabase();
    if(!totalTruck){
      return res.status(404).json({success: false, message: "No Trucks Stored"});
    }
    return res.status(200).json({
        success: true,
        trucks: totalTruck
    });
  } catch (error) {
    console.log("fetchAllTrucks Error: ", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// fetching Available Trucks
export const fetchAvailableTrucks = async (req, res) => {
    try {
        const availableTruck = await fetchAvailableTruck();     
    } catch (error) {
        console.log("fetchAvailableTrucks ERROR: ", error);
    }
}
