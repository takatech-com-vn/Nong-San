"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excuteQuery = void 0;
const mySQL_1 = require("../config/database/mySQL");
const excuteQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        mySQL_1.connection.query(query, params, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};
exports.excuteQuery = excuteQuery;
