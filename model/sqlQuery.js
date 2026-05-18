import db from "../database/sqlConnection.js";

// trucks operations and others

export const fetchTotalTruckToDatabase = async () => {
  const [totalTruck] = await db.query(
    `SELECT brand, photo_url, status, on_trip FROM tbl_truck`,
  );
  return totalTruck;
};

export const fetchAvailableTruck = async () => {
  const [availableTruck] = await db.query(
    `SELECT truck_id, brand, truck_type, photo_url, plate_number, on_trip from tbl_truck WHERE status = "available"`,
  );
  return availableTruck;
};

export const fetchInMaintenanceTruck = async () => {
  const [inMaintenance] = await db.query(
    `SELECT * FROM tbl_truck WHERE status = Maintenance`,
  );
  return inMaintenance;
};

export const fetchUnavailableTruck = async () => {
  const [unavailable] = await db.query(
    `SELECT * FROM tbl_truck WHERE status = Unavailable`,
  );
  return unavailable;
};

export const fetchSpecificTruck = async (truckId) => {
  const [truck] = await db.query(
    `SELECT model, plate_number, year, truck_type, fuel_type, status FROM tbl_truck WHERE truck_id = ?`,
    [truckId],
  );
  return truck[0];
};

export const fetchAllRelatedTruckToUser = async (id) => {
  const [result] = await db.query(
    "SELECT A.UID, A.trip_id, B.pickup_date, B.return_date, B.pickup_location, B.status, B.note, C.photo_url, C.model, C.plate_number, C.truck_id FROM tbl_trip AS A JOIN tbl_transaction AS B ON A.trip_id = B.trip_id JOIN tbl_truck AS C ON A.truck_id = C.truck_id WHERE A.UID = ?",
    [id],
  );
  return result;
};

// Users and Admin Operations

export const fetchUserForSignup = async (username, email) => {
  const [result] = await db.query(
    `SELECT username FROM tbl_users WHERE username = ? OR email = ?`,
    [username, email],
  );
  return result;
};

export const fetchUserForLogin = async (email) => {
  const [result] = await db.query(
    `SELECT UID, email, password, role FROM tbl_users WHERE email = ?`,
    [email],
  );
  return result[0];
};

export const fetchUserInfo = async (params) => {
  const [result] = await db.query(
    "SELECT username, photo, role, email, phone_number FROM tbl_users WHERE UID = ?",
    [params],
  );
  return result[0];
};

export const isAlreadyInTransac = async (id) => {
  const [result] = await db.query(
    "SELECT trip_id FROM tbl_trip WHERE truck_id = ?",
    [id],
  );
  return result;
};

export const fetchNotif = async (id) => {
  const [result] = await db.query("SELECT * FROM tbl_notif WHERE notif_id = ?", [id]);
  return result[0];
};

export const retrieveNotif = async (params) => {
  const [result] = await db.query("SELECT * FROM tbl_notif WHERE UID = ? ORDER BY timeStamp DESC LIMIT 10", [params]);
  return result;
};

// global operations and usage

export const insertToDatabase = async (table, input) => {
  const [result] = await db.query(`INSERT INTO \`${table}\` SET ?`, [input]);
  return result;
};

export const updateTruck = async (table, input, id) => {
  const [result] = await db.query(
    `UPDATE \`${table}\` SET ? WHERE truck_id = ?`,
    [input, id],
  );
  return result;
};

// For logs operation

export const insertToUserLog = async (input) => {
  const [result] = await db.query(`INSERT INTO tbl_logs SET ?`, [input]);
  return result;
};

export const fetchUserLogs = async () => {
  const [result] = await db.query(
    `SELECT UID, email, role, Created_at, action, status FROM tbl_logs ORDER BY Created_at DESC Limit 20`,
  );
  return result;
};

// Admin Actions
export const fetchOrders = async () => {
  const [result] = await db.query(
    "SELECT A.username, A.UID, B.trip_id, C.truck_id, C.model, C.photo_url, D.transac_id, D.pickup_date, D.return_date, D.pickup_location, D.note, D.amount, D.status FROM tbl_users AS A JOIN tbl_trip AS B ON A.UID = B.UID JOIN tbl_truck AS C ON B.truck_id = C.truck_id JOIN tbl_transaction AS D ON B.trip_id = D.trip_id",
  );
  return result;
};

export const updateTblTransac = async (id, up) => {
  const [result] = await db.query("UPDATE tbl_transaction SET ? WHERE transac_id = ?", [up, id]);
  return result;
};

export const deleteOrders = async (id) => {
  const [result] = await db.query("DELETE FROM tbl_trip WHERE trip_id = ?", [id]);
  return result;
};

export const fetchAllTrucks = async () => {
  const [result] = await db.query("SELECT * FROM tbl_truck");
  return result;
};
