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

    GetNewID (req: Request, res: Response) {
        const id = req.params.id;

        const query = 'Select * from news where id = ?'

        excuteQuery(query, [id])
            .then(news => {
                res.json({ success: true, news });
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ success: false, message: "Lỗi lấy dữ liệu tin tức"})
            })
    }

    getNewById = async (id: string) => {
        const query = 'SELECT * FROM news WHERE id = ?';
        const params = [id];
    
        try {
            const result: any = await excuteQuery(query, params);
            if (result.length > 0) {
                return result[0]; // Trả về slide đầu tiên (và duy nhất) từ kết quả
            } else {
                throw new Error('Không tìm thấy slide với id: ' + id);
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    UpdateNew = async (req: Request, res: Response) => {
        const id = req.params.id;
        const name = req.body.name;
        const short_description = req.body.shortDescription;
        const content = req.body.content;
        const file = req.file; // Truy cập file từ req.file
    
        // Lấy thông tin về slide hiện tại từ cơ sở dữ liệu
        const currentNew = await this.getNewById(id);
    
        // Kiểm tra xem currentSlide có tồn tại không
        if (!currentNew) {
            console.log("Không tìm thấy tin tức với id: " + id);
            res.status(404).json({ success: false, message: 'Không tìm thấy slide' });
            return;
        }
    
        let imagePath = currentNew.path; // Sử dụng đường dẫn hình ảnh hiện tại nếu không có hình ảnh mới
    
        if (file) {
            // Tạo đường dẫn hình ảnh từ req.body.path
            imagePath = '/images/' + req.body.path;
    
            // Xóa hình ảnh cũ từ thư mục trên máy chủ
            fs.unlink(path.join(__dirname, '../../public', currentNew.path), err => {
                if (err) console.log(`Error removing file: ${err}`);
            });
        }
    
        const query = 'UPDATE news SET name_new = ?, path = ?, short_description = ?, content = ?, updated_at = NOW() WHERE id = ?';
        const params = [name, imagePath, short_description, content,id]
    
        excuteQuery(query, params)
            .then(result => {
                res.json({ success: true, message: "Cập nhật slide thành công", result });
            })
            .catch(error => {
                console.log(error)
                // Xóa hình ảnh mới đã được lưu nếu có lỗi
                if (file) {
                    fs.unlink(path.join(__dirname, '../../public', imagePath), err => {
                        if (err) console.log(`Error removing file: ${err}`);
                    });
                }
                res.json({ success: false, message: "Cập nhật slide thất bại" });
            })
    }
}

export = new newController();