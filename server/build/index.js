"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const mySQL_1 = require("./config/database/mySQL");
const configSession_1 = require("./config/configSession");
const route = require("./routers");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = (0, express_1.default)();
const port = 3000;
(0, mySQL_1.connectToDatabase)();
(0, dotenv_1.config)();
(0, configSession_1.configSession)(app);
// Cấu hình máy chủ để phục vụ tệp tĩnh
app.use('/images', express_1.default.static(path.join(process.cwd(), 'public/images')));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
route(app);
app.get('/', (req, res) => {
    res.send('Hello');
});
app.post('/', (req, res) => {
    const data = req.body;
    console.log("data" + data);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
