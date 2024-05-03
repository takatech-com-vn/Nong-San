import { Request, Response } from "express";
import { excuteQuery } from "../util/callbackToPromise";
import path from "path";
import { error } from "console";
import fs from 'fs';

class newController {

    CreateNew (req: Request, res: Response) {
        const data = req.body;
        // console.log('data: ' + JSON.stringify(data))
        const file = req.file;
        // console.log('file: ' + JSON.stringify(file));
    
        if (file && data.name && data.shortDescription && data.content) {
            const imagePath = '/images/' + req.body.path;
    
            const query = 'INSERT INTO news (name_new, path, short_description, content, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';
    
            const params = [data.name, imagePath, data.shortDescription, data.content];
    
            excuteQuery(query, params)
                .then(result => {
                    res.json({ success: true, message: "Thêm tin tức thành công", result});
                })
                .catch(error => {
                    console.log(error);
                    // Xóa hình ảnh đã được lưu nếu có lỗi
                    fs.unlink(path.join(__dirname, '../../public', imagePath), err => {
                        if (err) console.log(`Error removing file: ${err}`);
                    });
                    res.status(500).json({ success: false, message: "Thêm tin tức thất bại"});
                })
        } else {
            console.log("Lỗi rồi")
            res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ hoặc không tìm thấy ảnh"})
        }
    }

    ListNew (req: Request, res: Response) {
        const query = 'Select * from news';

        excuteQuery(query, [])
            .then(news => {
                res.json({ success: true, news})
            })
            .catch(error => {
                res.json({ success: false, message: "Lỗi lấy dữ liệu tin tức"});
            })
    }

    DeleteNew (req: Request, res: Response) {
        const id = req.params.id;

        const queryPath = 'Select path from news where id = ?'

        excuteQuery(queryPath, [id])
            .then((result: any) => {
                const data = result as { path: string }[];
                if(data.length > 0) {
                    const imagePath = data[0].path;

                    fs.unlink(path.join(__dirname, '../../public', imagePath), err => {
                        if (err) console.log(`Error removing file: ${err}`)
                    })
                }

                const query = 'Delete from news where id = ?'

                return excuteQuery(query, [id])
            })
            .then(() => {
                res.json({ success: true });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ success: false, message: "Lỗi xóa banner PC"});
            });
    }
}

export = new newController();