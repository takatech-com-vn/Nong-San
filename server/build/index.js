"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const mySQL_1 = require("./config/database/mySQL");
(0, mySQL_1.connectToDatabase)();
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = Number(process.env.PORT);
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.get('/', (req, res) => {
    res.send('Hello work');
});
app.post('/', (req, res) => {
    res.send({
        data: req.body
    });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
