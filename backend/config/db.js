import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let db;

if (process.env.MYSQL_URL) {
  // ✅ Railway / Production
  db = mysql.createPool(process.env.MYSQL_URL);
  console.log("✅ Using Railway MYSQL_URL");
} else {
  // ✅ Local development
  db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  console.log("✅ Using local MySQL config");
}

export default db;