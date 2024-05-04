import * as session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import { config as dotenvConfig } from 'dotenv';
const MySQLStore = MySQLStoreFactory(session);
dotenvConfig();

const options = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  clearExpired: true,
  checkExpirationInterval: 60 * 1000, // Check every 1 minute
  expiration: 30 * 24 * 60 * 60 * 1000, // expires in 1 month
};

const sessionStore = new MySQLStore(options);

export default sessionStore;
