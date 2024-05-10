"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const brandController_1 = __importDefault(require("../Controller/brandController"));
const configSession_1 = require("../config/configSession");
const router = express_1.default.Router();
router.post('/createbrand', configSession_1.isAuthenticated, brandController_1.default.CreateBrand);
module.exports = router;
