"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSession = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const dotenv_1 = require("dotenv");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
(0, dotenv_1.config)();
const configSession = (app) => {
    const options = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        clearExpired: true,
        checkExpirationInterval: 1000 * 60 * 60 * 2,
        expiration: 5 * 24 * 60 * 60 * 1000,
    };
    const sessionStore = new MySQLStore(options);
    app.use(session({
        secret: "98765",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        proxy: true,
        cookie: { maxAge: 5 * 24 * 60 * 60 * 1000 },
    }));
    // Initialize Passport.js
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    // Configure JWT Strategy
    const jwtOptions = {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'your_default_secret',
    };
    passport_1.default.use(new passport_jwt_1.Strategy(jwtOptions, (jwtPayload, done) => {
        // Tìm kiếm người dùng dựa trên payload của JWT (thông thường là ID của người dùng)
        // Nếu tìm thấy người dùng, gọi hàm 'done' kèm theo người dùng
        // Nếu không tìm thấy, gọi hàm 'done' kèm theo giá trị false
    }));
};
exports.configSession = configSession;
