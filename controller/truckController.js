import {
  fetchTotalTruckToDatabase,
  fetchAvailableTruck,
  fetchInMaintenanceTruck,
  fetchUnavailableTruck,
} from "../model/sqlQuery.js";

// fetching all trucks for the preview page

export const fetchAllTrucks = async (req, res) => {
  try {
    const [totalTruck, available, inMaintenance, unavailable] =
      await Promise.all([
        fetchTotalTruckToDatabase,
        fetchAvailableTruck,
        fetchInMaintenanceTruck,
        fetchUnavailableTruck,
      ]);
    
    return res.status(200).json({
        success: true,
        totalVehicle: totalTruck.length,
        available,
        inMaintenance,
        unavailable
    })
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
