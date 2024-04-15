import { Request, Response } from "express";
import { connection } from "../config/database/mySQL";
import { excuteQuery } from "../util/callbackToPromise";
import bcryptjs, { hashSync } from 'bcryptjs';

class loginController {
    async Register (req: Request, res: Response) {
        const data = req.body;
        const password = data.password;
        const hashedPassword = bcryptjs.hashSync(password,10);
        data.password = hashedPassword;

        const query = 'Insert Into users (username, password, email, phone, role, created_at, updated_at) Values (?, ?, ?, ?, ?, NOW(), NOW())';

        const params = [data.username, data.password, data.email, data.phone, data.role];

        try {         
            const result = await excuteQuery(query, params);
            res.json({ success: true, message: 'Đăng ký tài khoản thành công', result});
        } catch (error) {

           console.log(error);
            res.status(500).json({ success: false, message: 'Lỗi đăng ký tài khoản '})            
        }
    }
}

export = new loginController();
