"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const loginRoute_1 = __importDefault(require("./loginRoute"));
const productRoute_1 = __importDefault(require("./productRoute"));
const policyRoute_1 = __importDefault(require("./policyRoute"));
const slideRoute_1 = __importDefault(require("./slideRoute"));
const newRoute_1 = __importDefault(require("./newRoute"));
const brandRoute_1 = __importDefault(require("./brandRoute"));
const wareHouseRoute_1 = __importDefault(require("./wareHouseRoute"));
function route(app) {
    app.use('/login', loginRoute_1.default);
    app.use('/product', productRoute_1.default);
    app.use('/policy', policyRoute_1.default);
    app.use('/slide', slideRoute_1.default);
    app.use('/new', newRoute_1.default);
    app.use('/brand', brandRoute_1.default);
    app.use('/warehouse', wareHouseRoute_1.default);
}
module.exports = route;
