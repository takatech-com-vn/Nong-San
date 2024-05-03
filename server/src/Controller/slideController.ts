import { Request, Response } from "express";
import { excuteQuery } from "../util/callbackToPromise";
import multer from 'multer';
import path from 'path';
import { checkPermissions } from '../util/checkPermissions'
import fs from 'fs';

class slideController {

    // constructor() {
    //     checkPermissions(); // Gọi hàm checkPermissions khi khởi tạo lớp
    // }

    CreateSlide(req: Request, res: Response) {
        const data = req.body;
        const file = req.file; // Truy cập file từ req.file
    
        if (file) {
            // Tạo đường dẫn hình ảnh từ req.body.path
            const imagePath = '/images/' + req.body.path;
    
            const query = 'INSERT INTO banner_pcs (name, path) VALUES (?, ?)';
            const params = [data.name, imagePath]
    
            excuteQuery(query, params)
                .then(result => {
                    res.json({ success: true, message: "Thêm slide thành công", result });
                })
                .catch(error => {
                    console.log(error)
                    // Xóa hình ảnh đã được lưu nếu có lỗi
                    fs.unlink(path.join(__dirname, '../../public', imagePath), err => {
                        if (err) console.log(`Error removing file: ${err}`);
                    });
                    res.json({ success: false, message: "Thêm slide thất bại" });
                })
        } else {
            console.log("Lỗi rồi")
            res.status(400).json({ success: false, message: 'Không có hình ảnh nào được tải lên' });
        }
    }

    CreateSlideMobile (req: Request, res: Response) {
        const data = req.body;
        const file = req.file; // Truy cập file từ req.file
    
        if (file) {
            // Tạo đường dẫn hình ảnh từ req.body.path
            const imagePath = '/images/' + req.body.path;

            const query = 'INSERT INTO banner_mobiles (name, path) VALUES (?, ?)';
            const params = [data.name, imagePath]

            excuteQuery(query, params)
            .then(result => {
                res.json({ success: true, message: "Thêm slide thành công", result})
            })
            .catch(error => {
                // Xóa hình ảnh đã được lưu nếu có lỗi
                fs.unlink(path.join(__dirname, '../../public', imagePath), err => {
                    if (err) console.log(`Error removing file: ${err}`);
                });
                res.status(500).json({ success: false, message: "Thêm slide thất bại"})
            })
        } else {
            res.status(400).json({ success: false, message: 'Không có hình ảnh nào được tải lên' });
        }
    }
    
    ListSlidePC (req: Request, res: Response) {
        const query = 'Select * from banner_pcs'

        excuteQuery(query, [])
            .then(banner_pcs => {
                res.json({ success: true, banner_pcs});
            })
            .catch(error => {
                res.status(500).json({ success: false, message: "Lỗi lấy dữ liệu slide pc"})
            })
    }

    ListSlideMobile (req: Request, res: Response) {
        const query = 'Select * from banner_mobiles';

        excuteQuery(query, [])
            .then(banner_mobiles => {
                res.json({ success: true, banner_mobiles, message: "Xóa banner thành công"});
            })
            .catch(error => {
                res.status(500).json({ success: false, message: "Lỗi lấy dữ liệu slide mobile"})
            })
    }

    DeletebannerPC (req: Request, res: Response) {
        const id = req.params.id;
        
        const queryPath = 'Select path from banner_pcs where id = ?'

        excuteQuery(queryPath, id)
            .then((result: any) => {
                const data = result as { path: string }[];
                if (data.length > 0) {
                    const imagePath = data[0].path;
                    //Xóa hình ảnh từ thư mục
                    fs.unlink(path.join(__dirname, '../../public', imagePath), err => {
                        if (err) console.log(`Error removing file: ${err}`)
                    })
                }

                //Xóa banner trong csdl
                const query = 'Delete from banner_pcs where id = ?'

                return excuteQuery(query, [id])
            })
            .then(() => {
                res.json({ success: true });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ success: false, message: "Lỗi xóa banner PC"});
            });
    };

    Deletebannermobile (req: Request, res: Response) {
        const id = req.params.id;

        const queryPath = 'Select path from banner_mobiles where id = ?'

        excuteQuery(queryPath, id)
            .then((result: any) => {
                const data = result as { path: string }[];

                if (data.length > 0) {
                    const imagePath = data[0].path;

                    fs.unlink(path.join(__dirname, '../../public', imagePath), err => {
                        if (err) console.log(`Error removing file: ${err}`)
                    })
                }

                const query = 'Delete from banner_mobiles where id = ?'

                return excuteQuery(query, [id])
            })
            .then(() => {
                res.json({ success: true });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ success: false, message: "Lỗi xóa banner Mobile"});
            });
    }
}

export = new slideController()