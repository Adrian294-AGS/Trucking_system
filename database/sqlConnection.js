import mysql from "mysql2";

const db = mysql.createPool({
    user: "root",
    password: "",
    host: "localhost",
    database: "trucking_db"
}).promise();

export default db;