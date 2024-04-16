import { Request, Response } from "express";
import { connection } from "../config/database/mySQL";
import { excuteQuery } from "../services/callbackToPromise";
import bcryptjs, { hashSync } from 'bcryptjs';
import { User } from "../services/user";

class loginController {
    async Register (req: Request, res: Response) {
        const data = req.body;
        console.log("data" + JSON.stringify(data));
        const password = data.password;
        const hashedPassword = bcryptjs.hashSync(password,10);
        data.password = hashedPassword;
        data.role = 'Customer';

        const query = 'Insert Into users (username, password, phone, role, created_at, updated_at) Values (?, ?, ?, ?, NOW(), NOW())';

        const params = [data.username, data.password, data.phone, data.role];

        try {         
            const result = await excuteQuery(query, params);
            res.json({ success: true, message: 'Đăng ký tài khoản thành công', result});
        } catch (error) {

           console.log(error);
            res.status(500).json({ success: false, message: 'Lỗi đăng ký tài khoản '})            
        }
    }

    async ListLogin (req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            //Tìm kiếm người dùng trong csdl
            const query = 'Select * from users where username = ?';
            const users = (await excuteQuery(query, [username])) as User[];

            if (users.length > 0) {
                const user = users[0];

                //Kiểm tra mật khẩu
                const passwordIsValid = bcryptjs.compareSync(password, user.password);

                if (!passwordIsValid) {
                    return res.status(401).json({ message: 'Mật khẩu không chính xác' });
                }

            } else {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }
}

export = new loginController();
