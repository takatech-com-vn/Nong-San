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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class loginController {
    Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const password = data.password;
            const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
            data.password = hashedPassword;
            data.role = 'Customer';
            try {
                // Kiểm tra xem username hoặc số điện thoại đã được sử dụng hay chưa
                const checkQuery = 'Select * from users where username = ? or phone = ?';
                const checkParams = [data.username, data.phone];
                const existingUsers = (yield (0, callbackToPromise_1.excuteQuery)(checkQuery, checkParams));
                if (existingUsers.length > 0) {
                    // Nếu tìm thấy người dùng hiện có, trả về lỗi
                    return res.status(400).json({ success: false, message: 'Tên người dùng hoặc số điện thoại đã được sử dụng' });
                }
                // Nếu không tìm thấy người dùng hiện có, tiếp tục đăng ký
                const query = 'Insert Into users (username, password, phone, role, created_at, updated_at) Values (?, ?, ?, ?, NOW(), NOW())';
                const params = [data.username, data.password, data.phone, data.role];
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
                    console.log(password);
                    if (passwordIsValid) {
                        console.log("Người dùng đã đăng nhập thành công");
                        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'your_default_secret', {
                            expiresIn: 2592000 // expires in 1 month
                        });
                        console.log("token" + JSON.stringify(token));
                        // Calculate the expiry time
                        const expiryTime = new Date().getTime() + 300 * 1000;
                        //Kiểm tra người dùng đã đăng nhập hay chưa
                        if (req.isAuthenticated()) {
                            //Người dùng đã đăng nhập, không cần tạo phiên mới
                            return res.status(200).json({ auth: true, token: token, expiryTime: expiryTime });
                        }
                        else {
                            //Người dùng chưa đăng nhập, tạo phiên mới
                            // Lưu ID người dùng vào session
                            req.login(user, function (err) {
                                if (err) {
                                    return res.status(500).json({ message: "Lỗi máy chủ" });
                                }
                                return res.status(200).json({ auth: true, token: token, expiryTime: expiryTime, username: user.username });
                            });
                        }
                    }
                    if (!passwordIsValid) {
                        console.log("Mật khẩu không chính xác");
                        return res.status(401).json({ message: 'Mật khẩu không chính xác' });
                    }
                }
                else {
                    console.log("Người dùng không tồn tại");
                    return res.status(404).json({ message: 'Người dùng không tồn tại' });
                }
            }
            catch (error) {
                console.log("Lỗi máy chủ");
                return res.status(500).json({ message: 'Lỗi máy chủ' });
            }
        });
    }
    Logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.logout();
            res.redirect('/login');
        });
    }
    ForgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone, newPassword } = req.body;
            try {
                // Tìm kiếm người dùng dựa trên số điện thoại từ cơ sở dữ liệu
                const query = 'Select * from users where phone = ?';
                const users = (yield (0, callbackToPromise_1.excuteQuery)(query, [phone]));
                if (users.length > 0) {
                    const user = users[0];
                    // Kiểm tra xem mật khẩu hiện tại có khớp với số điện thoại hay không
                    const passwordIsValid = bcryptjs_1.default.compareSync(phone, user.password);
                    if (passwordIsValid) {
                        // Nếu mật khẩu hiện tại khớp với số điện thoại, cho phép người dùng đổi mật khẩu
                        const hashedPassword = bcryptjs_1.default.hashSync(newPassword, 10);
                        const updateQuery = 'Update users set password = ? where id = ?';
                        yield (0, callbackToPromise_1.excuteQuery)(updateQuery, [hashedPassword, user.id]);
                        res.json({ success: true, message: 'Đổi mật khẩu thành công' });
                    }
                    else {
                        res.status(400).json({ success: false, message: 'Số điện thoại không khớp với mật khẩu hiện tại' });
                    }
                }
                else {
                    res.status(404).json({ success: false, message: 'Không tìm thấy người dùng với số điện thoại này' });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
            }
        });
    }
}
module.exports = new loginController();
