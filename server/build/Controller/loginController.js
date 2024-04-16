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
const callbackToPromise_1 = require("../services/callbackToPromise");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class loginController {
    Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const password = data.password;
            const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
            data.password = hashedPassword;
            data.role = 'Customer';
            const query = 'Insert Into users (username, password, phone, role, created_at, updated_at) Values (?, ?, ?, ?, NOW(), NOW())';
            const params = [data.username, data.password, data.phone, data.role];
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
    ListLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                //Tìm kiếm người dùng trong csdl
                const query = 'Select * from users where username = ?';
                const users = (yield (0, callbackToPromise_1.excuteQuery)(query, [username]));
                if (users.length > 0) {
                    const user = users[0];
                    //Kiểm tra mật khẩu
                    const passwordIsValid = bcryptjs_1.default.compareSync(password, user.password);
                    if (!passwordIsValid) {
                        return res.status(401).json({ message: 'Mật khẩu không chính xác' });
                    }
                }
                else {
                    return res.status(404).json({ message: 'Người dùng không tồn tại' });
                }
            }
            catch (error) {
                return res.status(500).json({ message: 'Lỗi máy chủ' });
            }
        });
    }
}
module.exports = new loginController();
