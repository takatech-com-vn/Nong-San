import mysql from 'mysql2';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

// create the connection to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Hàm để kết nối tới cơ sở dữ liệu
const connectToDatabase = () => {
    connection.connect((err) => {
        if (err) {
            console.error("Lỗi kết nối:", err);
        } else {
            console.log("Kết nối thành công đến MySQL");
        }
    });
};

export { connection, connectToDatabase };