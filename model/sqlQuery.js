import db from "../database/sqlConnection.js";

// trucks operations and others

export const fetchTotalTruckToDatabase = async () => {
    const [totalTruck] = await db.query(`SELECT * FROM tbl_truck`);
    return totalTruck;
};

export const fetchAvailableTruck = async () => {
    const [availableTruck] = await db.query(`SELECT * from tbl_truck WHERE status = Available`);
    return availableTruck;
};

export const fetchInMaintenanceTruck = async () => {
    const [inMaintenance] = await db.query(`SELECT * FROM tbl_truck WHERE status = Maintenance`);
    return inMaintenance;
};

export const fetchUnavailableTruck = async () => {
    const [unavailable] = await db.query(`SELECT * FROM tbl_truck WHERE status = Unavailable`);
    return unavailable;
};

export const fetchSpecificTruck = async (truckId) => {
    const [truck] = await db.query(`SELECT model, plate_number, year, truck_type, fuel_type, status FROM tbl_truck WHERE truck_id = ?`, [truckId]);
    return truck[0];
};

// Users and Admin Operations

export const fetchUserForSignup = async (username, email) => {
    const [result] = await db.query(`SELECT username FROM tbl_users WHERE username = ? OR email = ?`,[username, email]);
    return result;
};

export const fetchUserForLogin = async (email) => {
    const [result] = await db.query(`SELECT email, password, role FROM tbl_users WHERE email = ?`, [email]);
    return result[0];
};

// global operations and usage

export const insertToDatabase = async (table, input) => { 
    const [result] = await db.query(`INSERT INTO \`${table}\` SET ?`, [input]);
    return result;
};

export const updateDatabase = async (table, input) => {
    const [result] = await db.query(`UPDATE \`${table}\` SET ?`, [input]);
    return result;
};

// For logs operation

export const insertToUserLog = async (input) => {
    const [result] = await db.query(`INSERT INTO tbl_logs SET ?`, [input]);
    return result;
};

export const fetchUserLogs = async () => {
    const [result] = await db.query(`SELECT UID, email, role, Created_at, action, status FROM tbl_logs`);
    return result;
};





