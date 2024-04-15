import { connection } from '../config/database/mySQL';

const excuteQuery = (query: any, params: any) => {
    return new Promise((resolve, reject) => {
      connection.query(query, params, (error: any, results: any, fields: any) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  };

export { excuteQuery };