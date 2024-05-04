import { Request, Response } from "express";
import { excuteQuery } from "../util/callbackToPromise";
import bcryptjs, { hashSync } from 'bcryptjs';
import { User } from "../services/user";
import jwt from 'jsonwebtoken';


class loginController {
    async Register(req: Request, res: Response) {
        const data = req.body;
        const password = data.password;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        data.password = hashedPassword;
        data.role = 'Customer';

        try {
            // Kiểm tra xem username hoặc số điện thoại đã được sử dụng hay chưa
            const checkQuery = 'Select * from users where username = ? or phone = ?';
            const checkParams = [data.username, data.phone];
            const existingUsers = (await excuteQuery(checkQuery, checkParams)) as User[];

            if (existingUsers.length > 0) {
                // Nếu tìm thấy người dùng hiện có, trả về lỗi
                return res.status(400).json({ success: false, message: 'Tên người dùng hoặc số điện thoại đã được sử dụng' });
            }

            // Nếu không tìm thấy người dùng hiện có, tiếp tục đăng ký
            const query = 'Insert Into users (username, password, phone, role, created_at, updated_at) Values (?, ?, ?, ?, NOW(), NOW())';
            const params = [data.username, data.password, data.phone, data.role];
            const result = await excuteQuery(query, params);
            res.json({ success: true, message: 'Đăng ký tài khoản thành công', result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Lỗi đăng ký tài khoản ' })
        }
    }

    async ListLogin(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            //Tìm kiếm người dùng trong csdl
            const query = 'Select * from users where username = ?';
            const users = (await excuteQuery(query, [username])) as User[];

            if (users.length > 0) {
                const user = users[0];

                //Kiểm tra mật khẩu
                const passwordIsValid = bcryptjs.compareSync(password, user.password);
                // console.log(password)

                if (passwordIsValid) {
                    // console.log("Người dùng đã đăng nhập thành công");
                    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'your_default_secret', {
                        expiresIn: 30 * 24 * 60 * 60 // expires in 1 month
                    });

                    // console.log("token" + JSON.stringify(token));

                    // Calculate the expiry time
                    const expiryTime = new Date().getTime() + 300 * 1000;


                    //Kiểm tra người dùng đã đăng nhập hay chưa
                    if (req.isAuthenticated()) {
                        //Người dùng đã đăng nhập, không cần tạo phiên mới
                        return res.status(200).json({ auth: true, token: token, expiryTime: expiryTime });
                    } else {
                        //Người dùng chưa đăng nhập, tạo phiên mới
                        // Lưu ID người dùng vào session
                        req.login(user, function (err) { // sử dụng hàm login của passport để lưu id người dùng vào session
                            if (err) {
                                return res.status(500).json({ message: "Lỗi máy chủ" });
                            }

                            console.log("Session ID mới: " + req.session.id); // In ra session_id mới
                            // Trả về thông tin người dùng
                            return res.status(200).json({
                                auth: true,
                                token: token,
                                expiryTime: expiryTime,
                                id: user.id,
                                username: user.username,
                                phone: user.phone,
                                role: user.role,
                                created_at: user.created_at,
                                updated_at: user.updated_at
                            });
                        });
                    }
                }

                if (!passwordIsValid) {
                    // console.log("Mật khẩu không chính xác")
                    return res.status(401).json({ message: 'Mật khẩu không chính xác' });
                }

            } else {
                // console.log("Người dùng không tồn tại")
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }
        } catch (error) {
            // console.log("Lỗi máy chủ")
            return res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }

    async UserLogin(req: Request, res: Response) {
        const token: any = req.headers['x-access-token'];

        // Giải mã JWT
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your_default_secret');
        // console.log(decoded);

        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

        try {
            // Tìm người dùng dựa trên id từ JWT
            const users = await excuteQuery('SELECT * FROM users WHERE id = ?', [decoded.id]) as User[];
            const user = users[0];
            if (!user) return res.status(404).json("No user found.");

            // console.log(user);
            // Trả về thông tin người dùng
            return res.status(200).json(user);
        } catch (error: any) {
            console.log(error);
            console.log(error.response);
            return res.status(500).json("There was a problem with the server.");
        }
    }


    Logout(req: Request, res: Response) {
        req.logout(function(err) { // Hủy phiên session và xử lý lỗi
            if (err) {
                console.log('Lỗi khi hủy đăng nhập:', err);
                return res.status(500).json({ message: "Lỗi máy chủ" });
            }
    
            req.session.destroy(function(err) { // Xóa session khỏi cơ sở dữ liệu
                if (err) {
                    console.log('Không thể hủy session', err);
                    return res.status(500).json({ message: "Lỗi máy chủ" });
                }
    
                res.clearCookie('connect.sid'); // Xóa cookie session
                res.status(200).json({ message: "Đăng xuất thành công" }); // Trả về thông báo cho client
            });
        });
    }    


    async ForgotPassword(req: Request, res: Response) {
        const { phone, newPassword } = req.body;

        try {
            // Tìm kiếm người dùng dựa trên số điện thoại từ cơ sở dữ liệu
            const query = 'Select * from users where phone = ?';
            const users = (await excuteQuery(query, [phone])) as User[];

            if (users.length > 0) {
                const user = users[0];

                // Kiểm tra xem mật khẩu hiện tại có khớp với số điện thoại hay không
                const passwordIsValid = bcryptjs.compareSync(phone, user.password);

                if (passwordIsValid) {
                    // Nếu mật khẩu hiện tại khớp với số điện thoại, cho phép người dùng đổi mật khẩu
                    const hashedPassword = bcryptjs.hashSync(newPassword, 10);
                    const updateQuery = 'Update users set password = ? where id = ?';
                    await excuteQuery(updateQuery, [hashedPassword, user.id]);
                    res.json({ success: true, message: 'Đổi mật khẩu thành công' });
                } else {
                    res.status(400).json({ success: false, message: 'Số điện thoại không khớp với mật khẩu hiện tại' });
                }
            } else {
                res.status(404).json({ success: false, message: 'Không tìm thấy người dùng với số điện thoại này' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
        }
    }
}

export = new loginController();
