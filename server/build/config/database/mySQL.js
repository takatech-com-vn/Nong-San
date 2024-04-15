"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.connection = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// create the connection to database
const pool = mysql2_1.default.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
exports.connection = pool;
// Hàm để kết nối tới cơ sở dữ liệu
const connectToDatabase = () => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Lỗi kết nối:", err);
        }
        else {
            console.log("Kết nối thành công đến MySQL");
            connection.release();
        }
    });
};
exports.connectToDatabase = connectToDatabase;
