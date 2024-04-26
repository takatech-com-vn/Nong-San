import { Request, Response } from "express";
import { excuteQuery } from "../util/callbackToPromise";
import multer from 'multer';
import path from 'path';
import { Banner } from "../services/banner";
import { checkPermissions } from '../util/checkPermissions'

class slideController {

    // constructor() {
    //     checkPermissions(); // Gọi hàm checkPermissions khi khởi tạo lớp
    // }

    async CreateSlide(req: Request, res: Response) {
        const data = req.body;
        const file = req.file; // Truy cập file từ req.file
    
        if (file) {
            // Tạo đường dẫn hình ảnh từ req.body.path
            const imagePath = '/images/' + req.body.path;
    
            const query = 'INSERT INTO banner_pcs (name_bannerpc, path) VALUES (?, ?)';
            const params = [data.name, imagePath]
    
            excuteQuery(query, params)
                .then(result => {
                    res.json({ success: true, message: "Thêm slide thành công", result });
                })
                .catch(error => {
                    console.log(error)
                    res.json({ success: false, message: "Thêm slide thất bại" });
                })
        } else {
            console.log("Lỗi rồi")
            res.status(400).json({ success: false, message: 'Không có hình ảnh nào được tải lên' });
        }
    }

    async CreateSlideMobile (req: Request, res: Response) {
        const data = req.body;
        const file = req.file; // Truy cập file từ req.file
    
        if (file) {
            // Tạo đường dẫn hình ảnh từ req.body.path
            const imagePath = '/images/' + req.body.path;

            const query = 'INSERT INTO banner_mobiles (name_mobilepc, path) VALUES (?, ?)';
            const params = [data.name, imagePath]

            excuteQuery(query, params)
            .then(result => {
                res.json({ success: true, message: "Thêm slide thành công", result})
            })
            .catch(error => {
                res.status(500).json({ success: false, message: "Thêm slide thất bại"})
            })
        } else {
            res.status(400).json({ success: false, message: 'Không có hình ảnh nào được tải lên' });
        }
    }
    
    async ListSlidePC (req: Request, res: Response) {
        const query = 'Select * from banner_pcs'

        excuteQuery(query, [])
            .then(banner_pcs => {
                res.json({ success: true, banner_pcs});
            })
            .catch(error => {
                res.status(500).json({ success: false, message: "Lỗi lấy dữ liệu slide pc"})
            })
    }

    async ListSlideMobile (req: Request, res: Response) {
        const query = 'Select * from banner_mobiles';

        excuteQuery(query, [])
            .then(banner_mobiles => {
                res.json({ success: true, banner_mobiles});
            })
            .catch(error => {
                res.status(500).json({ success: false, message: "Lỗi lấy dữ liệu slide mobile"})
            })
    }
}

export = new slideController()