"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const wareHouseController_1 = __importDefault(require("../Controller/wareHouseController"));
const router = express_1.default.Router();
router.get('/getwarehouse', wareHouseController_1.default.GetWareHouse);
module.exports = router;
