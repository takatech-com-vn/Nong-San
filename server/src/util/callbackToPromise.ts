import { connection } from '../config/database/mySQL';

const query = (query: any, params: any) => {
    return new Promise((resolve, reject) => {
      connection.query(query, params, (error: any, results: any, fields: any) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  };

  exports = { query }