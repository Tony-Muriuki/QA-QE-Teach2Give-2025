import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
});
export default pool;
