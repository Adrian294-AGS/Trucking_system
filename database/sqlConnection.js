import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
    user: process.env.mySQL_USER,
    password: process.env.mySQL_PASSWORD,
    host: process.env.mySQL_HOST,
    database: process.env.mySQL_DATABASE
}).promise();

export default db;