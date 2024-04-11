"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const productRoute_1 = __importDefault(require("./productRoute"));
function route(app) {
    app.use('/productRoute', productRoute_1.default);
}
module.exports = route;
