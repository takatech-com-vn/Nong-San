import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config as dotenvConfig } from 'dotenv';
import { Express } from 'express';
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
import { User } from "../services/user";
import { excuteQuery } from '../services/callbackToPromise';

dotenvConfig();

export const configSession = (app: Express) => {
    const options = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      clearExpired: true,
      checkExpirationInterval: 1000 * 60 * 60 * 2,
      expiration: 30 * 24 * 60 * 60 * 1000, // expires in 1 month
    };
  
    const sessionStore = new MySQLStore(options);
  
    app.use(
      session({
        secret: "98765",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        proxy: true,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // expires in 1 month
      })
    );

    // Initialize Passport.js
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user: any, done) {
      done(null, user.id);
    });
    
    passport.deserializeUser(async function(id, done) {
        try {
            //TÌm kiếm người dùng dựa trên ID từ cơ sở dữ liệu
            const query = 'Select * from users where id = ?';
            const users = (await excuteQuery(query, [id])) as User[];

            if (users.length > 0) {
              const user = users[0];
              
              //Gọi hàm done kèm theo người dùng
              done(null, user);
            } else {
              //Nếu không tìm thấy, gọi hàm done kèm theo giá trị false
              done(null, false);
            }
        } catch (error) {
          done(error);
        }
    });
};