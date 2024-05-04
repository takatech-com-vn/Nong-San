"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const loginController_1 = __importDefault(require("../Controller/loginController"));
const configSession_1 = require("../config/configSession");
const router = express_1.default.Router();
router.post('/register', loginController_1.default.Register);
router.post('/listlogin', loginController_1.default.ListLogin);
router.get('/user', configSession_1.isAuthenticated, loginController_1.default.UserLogin);
router.get('/logout', configSession_1.isAuthenticated, loginController_1.default.Logout);
router.post('/forgot-password', loginController_1.default.ForgotPassword);
module.exports = router;
