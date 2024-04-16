import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config as dotenvConfig } from 'dotenv';
import { Express } from 'express';
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

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
      expiration: 5 * 24 * 60 * 60 * 1000,
    };
  
    const sessionStore = new MySQLStore(options);
  
    app.use(
      session({
        secret: "98765",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        proxy: true,
        cookie: { maxAge: 5 * 24 * 60 * 60 * 1000 },
      })
    );

    // Initialize Passport.js
    app.use(passport.initialize());
    app.use(passport.session());

    // Configure JWT Strategy
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'your_default_secret',
      };

    passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
        // Tìm kiếm người dùng dựa trên payload của JWT (thông thường là ID của người dùng)
        // Nếu tìm thấy người dùng, gọi hàm 'done' kèm theo người dùng
        // Nếu không tìm thấy, gọi hàm 'done' kèm theo giá trị false
  }));
};