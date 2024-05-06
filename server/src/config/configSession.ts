import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config as dotenvConfig } from 'dotenv';
import { Express } from 'express';
import { User } from "../services/user";
import { excuteQuery } from '../util/callbackToPromise';
import { Request, Response, NextFunction } from 'express';
import sessionStore from './sessionStore';
import session from 'express-session';

dotenvConfig();

export const configSession = (app: Express) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'your_default_secret',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      proxy: true,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: false }, // expires in 1 month
    })
  );

  // Initialize Passport.js
  app.use(passport.initialize());
  app.use(passport.session());

  // mã hóa thông tin người dùng và tạo phiên (save)
  passport.serializeUser(function(user: any, done) {
    done(null, user.id);
  });
    
  // giải mã thông tin người dùng
  passport.deserializeUser(async function(id: string, done) {
    try {
        const query = 'Select * from users where id = ?';
        const users = (await excuteQuery(query, [id])) as User[];
    
        // console.log('Users: ', users); // In ra dữ liệu người dùng
    
        if (users.length > 0) {
            const user = users[0];
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        console.error('Lỗi khi deserialize người dùng:', error); // In ra lỗi
        done(error);
    }
  });
};

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // console.log('Is authenticated:', req.isAuthenticated()); // In ra trạng thái xác thực
  // console.log("Kiểm tra session: " + req.session.id);
  if (req.isAuthenticated()) {
      return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};