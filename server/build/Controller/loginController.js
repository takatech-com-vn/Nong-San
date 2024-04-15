"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const callbackToPromise_1 = require("../util/callbackToPromise");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class loginController {
    Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const password = data.password;
            const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
            data.password = hashedPassword;
            const query = 'Insert Into users (username, password, email, phone, role, created_at, updated_at) Values (?, ?, ?, ?, ?, NOW(), NOW())';
            const params = [data.username, data.password, data.email, data.phone, data.role];
            try {
                const result = yield (0, callbackToPromise_1.excuteQuery)(query, params);
                res.json({ success: true, message: 'Đăng ký tài khoản thành công', result });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ success: false, message: 'Lỗi đăng ký tài khoản ' });
            }
        });
    }
}
module.exports = new loginController();
