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
exports.configSession = void 0;
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = require("dotenv");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const callbackToPromise_1 = require("../services/callbackToPromise");
(0, dotenv_1.config)();
const configSession = (app) => {
    const options = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        clearExpired: true,
        checkExpirationInterval: 1000 * 60 * 5, // Check every 5 minutes
        expiration: 5 * 60 * 1000, // expires in 5 minutes
    };
    const sessionStore = new MySQLStore(options);
    app.use(session({
        secret: process.env.SESSION_SECRET || 'your_default_secret',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        proxy: true,
        cookie: { maxAge: 5 * 60 * 1000 }, // expires in 5 minutes
    }));
    // Initialize Passport.js
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    passport_1.default.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport_1.default.deserializeUser(function (id, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //TÌm kiếm người dùng dựa trên ID từ cơ sở dữ liệu
                const query = 'Select * from users where id = ?';
                const users = (yield (0, callbackToPromise_1.excuteQuery)(query, [id]));
                if (users.length > 0) {
                    const user = users[0];
                    //Gọi hàm done kèm theo người dùng
                    done(null, user);
                }
                else {
                    //Nếu không tìm thấy, gọi hàm done kèm theo giá trị false
                    done(null, false);
                }
            }
            catch (error) {
                done(error);
            }
        });
    });
};
exports.configSession = configSession;
