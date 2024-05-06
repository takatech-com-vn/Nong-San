"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.configSession = void 0;
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = require("dotenv");
const callbackToPromise_1 = require("../util/callbackToPromise");
const sessionStore_1 = __importDefault(require("./sessionStore"));
const express_session_1 = __importDefault(require("express-session"));
(0, dotenv_1.config)();
const configSession = (app) => {
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET || 'your_default_secret',
        resave: false,
        saveUninitialized: false,
        store: sessionStore_1.default,
        proxy: true,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: false }, // expires in 1 month
    }));
    // Initialize Passport.js
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    // mã hóa thông tin người dùng và tạo phiên (save)
    passport_1.default.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // giải mã thông tin người dùng
    passport_1.default.deserializeUser(function (id, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'Select * from users where id = ?';
                const users = (yield (0, callbackToPromise_1.excuteQuery)(query, [id]));
                // console.log('Users: ', users); // In ra dữ liệu người dùng
                if (users.length > 0) {
                    const user = users[0];
                    done(null, user);
                }
                else {
                    done(null, false);
                }
            }
            catch (error) {
                console.error('Lỗi khi deserialize người dùng:', error); // In ra lỗi
                done(error);
            }
        });
    });
};
exports.configSession = configSession;
const isAuthenticated = (req, res, next) => {
    // console.log('Is authenticated:', req.isAuthenticated()); // In ra trạng thái xác thực
    // console.log("Kiểm tra session: " + req.session.id);
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized" });
};
exports.isAuthenticated = isAuthenticated;
