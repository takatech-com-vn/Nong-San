import { Request, Response } from "express";
import { excuteQuery } from "../util/callbackToPromise";
import { error } from "console";

class policyController {
    async CreatePolicy (req: Request, res: Response) {
        const data = req.body;
        console.log('policy: ' + JSON.stringify(data))

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

    async ListPolicy (req: Request, res: Response) {
        const query = 'Select * from policis';

        excuteQuery(query, [])
            .then(policis => {
                res.json({ success: true, policis});
            })
            .catch(error => {
                res.status(500).json({ success: false, message: "Lấy dữ liệu chính sách thất bại"});
            })
    }
}
export = new policyController();