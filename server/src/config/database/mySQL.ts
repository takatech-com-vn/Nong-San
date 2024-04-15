import mysql from 'mysql2';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

// create the connection to database
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Hàm để kết nối tới cơ sở dữ liệu
const connectToDatabase = () => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Lỗi kết nối:", err);
        } else {
            console.log("Kết nối thành công đến MySQL");
            connection.release();
        }
    });
};

export { pool as connection, connectToDatabase };