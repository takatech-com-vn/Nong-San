import { Request, Response } from "express";
import { excuteQuery } from "../util/callbackToPromise";
import { error } from "console";

class policyController {
    CreatePolicy (req: Request, res: Response) {
        const data = req.body;

        const query = 'INSERT INTO policis (name, content) VALUES (?, ?)';
        const params = [data.name, data.content];

        excuteQuery(query, params)
            .then(result => {
                res.status(200).json({ success: true, message: 'Thêm chính sách thành công', result});
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ success: false, message: "Thêm chính sách thất bại"});
            })
    }

    ListPolicy (req: Request, res: Response) {
        const query = 'Select * from policis';

        excuteQuery(query, [])
            .then(policis => {
                res.json({ success: true, policis});
            })
            .catch(error => {
                res.status(500).json({ success: false, message: "Lấy dữ liệu chính sách thất bại"});
            })
    }

    DeletePolicy (req: Request, res: Response) {
        const id = req.params.id;

        const query = 'Delete from policis where id = ?'

        excuteQuery(query, [id])
            .then(() => {
                res.json({ success: true });
            })
            .catch(error => {
                res.status(500).json({ success: false });
            })
    }

    GetPolicyID (req: Request, res: Response) {
        const id = req.params.id;

        const query = 'Select * from policis where id = ?'

        excuteQuery(query, [id])
            .then(policis => {
                res.json({ success: true, policis});
            })
            .catch(() => {
                res.status(500).json({ success: false, message: "Lỗi lấy dữ liệu policy"});
            })
    }

    UpdatePolicy (req: Request, res: Response) {
        
    }
}
export = new policyController();