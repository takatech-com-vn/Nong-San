import { Request, Response } from "express";
import { excuteQuery } from "../util/callbackToPromise";
import path from "path";
import { error } from "console";

class newController {

    async CreateNew (req: Request, res: Response) {
        const data = req.body;
        console.log('data: ' + JSON.stringify(data))
        const file = req.file;
        console.log('file: ' + JSON.stringify(file));
    
        if (file && data.name && data.shortDescription && data.content) {
            const imagePath = path.join('src/image/newimages', file.filename);
    
            const query = 'INSERT INTO news (name_new, path, short_description, content, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';
    
            const params = [data.name, imagePath, data.shortDescription, data.content];
    
            excuteQuery(query, params)
                .then(result => {
                    res.json({ success: true, message: "Thêm tin tức thành công", result});
                })
                .catch(error => {
                    res.status(500).json({ success: false, message: "Thêm tin tức thất bại"});
                })
        } else {
            console.log("Lỗi rồi")
            res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ hoặc không tìm thấy ảnh"})
        }
    }

    async ListNew (req: Request, res: Response) {
        const query = 'Select * from news';

        excuteQuery(query, [])
            .then(news => {
                res.json({ success: true, news})
            })
            .catch(error => {
                res.json({ success: false, message: "Lỗi lấy dữ liệu tin tức"});
            })
    }
}

export = new newController();