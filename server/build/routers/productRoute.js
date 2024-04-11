"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../Controller/productController"));
const router = express_1.default.Router();
router.post('/getproduct', productController_1.default.getproduct);
module.exports = router;
