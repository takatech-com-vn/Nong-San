"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mySQL_1 = require("../config/database/mySQL");
const query = (query, params) => {
    return new Promise((resolve, reject) => {
        mySQL_1.connection.query(query, params, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};
exports = { query };
