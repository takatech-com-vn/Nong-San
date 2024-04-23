"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const policyController_1 = __importDefault(require("../Controller/policyController"));
const route = express_1.default.Router();
route.post('/create', policyController_1.default.CreatePolicy);
route.get('/listpolicy', policyController_1.default.ListPolicy);
module.exports = route;
