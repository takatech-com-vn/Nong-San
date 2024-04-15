"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const loginRoute_1 = __importDefault(require("./loginRoute"));
const productRoute_1 = __importDefault(require("./productRoute"));
function route(app) {
    app.use('/login', loginRoute_1.default);
    app.use('/product', productRoute_1.default);
}
module.exports = route;
