"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const loginController_1 = __importDefault(require("../Controller/loginController"));
const router = express_1.default.Router();
router.post('/register', loginController_1.default.Register);
router.post('/listlogin', loginController_1.default.ListLogin);
module.exports = router;
