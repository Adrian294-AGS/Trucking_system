import {
  fetchTotalTruckToDatabase,
  fetchAvailableTruck,
  insertToDatabase,
  updateTruck,
  isAlreadyInTransac,
  fetchAllRelatedTruckToUser
} from "../model/sqlQuery.js";

// fetching all trucks for the preview page
export const fetchAllTrucks = async (req, res) => {
  try {
    const totalTruck = await fetchTotalTruckToDatabase();
    if (!totalTruck) {
      return res
        .status(404)
        .json({ success: false, message: "No Trucks Stored" });
    }
    return res.status(200).json({
      success: true,
      trucks: totalTruck,
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
    if (!availableTruck) {
      return res
        .status(404)
        .json({ success: false, message: "No Trucks Stored" });
    }
    return res.status(200).json({ success: true, availableTruck });
  } catch (error) {
    console.log("fetchAvailableTrucks ERROR: ", error);
  }
};

// Renting a Truck

export const rentTruck = async (req, res) => {
  const { UID } = req.user;
  const { truck_id, pickup_date, return_date, pickup_location, notes } =
    req.body;
  try {
    const isReserved = await isAlreadyInTransac(truck_id);
    if (isReserved)
      return res
        .status(202)
        .json({
          success: false,
          message: "Were Sorry this Truck is Already Reserved",
        });

    const trip = {
      UID: UID,
      truck_id: truck_id,
    };

    const insertToTrip = await insertToDatabase("tbl_trip", trip);

    const transac = {
      trip_id: insertToTrip.insertId,
      amount: 0.0,
      pickup_date: pickup_date,
      return_date: return_date,
      status: "reserved",
      pickup_location: pickup_location,
      note: notes,
    };

    await updateTruck("tbl_truck", {on_trip: 1}, truck_id);

    await insertToDatabase("tbl_transaction", transac);

    return res
      .status(201)
      .json({ success: true, message: "Successfully Processed" });
  } catch (error) {
    console.log("RentTruck ERROR: ", error);
    return res.status(500).json({ success: false, message: "SERVER ERROR" });
  }
};


// Geting user orders

export const getOrders = async (req, res) => {
  const { UID } = req.user;

  try {
    const orders = await fetchAllRelatedTruckToUser(UID);
    if(!orders){
      return res.status(404).json({success: false, message: "Trucks do not Found"})
    }
    return res.status(200).json({success: true, message: "Fetched Successfull", orders});
  } catch (error) {
    console.log("RentTruck ERROR: ", error);
    return res.status(500).json({ success: false, message: "SERVER ERROR" });
  }
}

