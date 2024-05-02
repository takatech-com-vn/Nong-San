"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const callbackToPromise_1 = require("../util/callbackToPromise");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class newController {
    CreateNew(req, res) {
        const data = req.body;
        // console.log('data: ' + JSON.stringify(data))
        const file = req.file;
        // console.log('file: ' + JSON.stringify(file));
        if (file && data.name && data.shortDescription && data.content) {
            const imagePath = '/images/' + req.body.path;
            const query = 'INSERT INTO news (name_new, path, short_description, content, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';
            const params = [data.name, imagePath, data.shortDescription, data.content];
            (0, callbackToPromise_1.excuteQuery)(query, params)
                .then(result => {
                res.json({ success: true, message: "Thêm tin tức thành công", result });
            })
                .catch(error => {
                console.log(error);
                // Xóa hình ảnh đã được lưu nếu có lỗi
                fs_1.default.unlink(path_1.default.join(__dirname, '../../public', imagePath), err => {
                    if (err)
                        console.log(`Error removing file: ${err}`);
                });
                res.status(500).json({ success: false, message: "Thêm tin tức thất bại" });
            });
        }
        else {
            console.log("Lỗi rồi");
            res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ hoặc không tìm thấy ảnh" });
        }
    }
    ListNew(req, res) {
        const query = 'Select * from news';
        (0, callbackToPromise_1.excuteQuery)(query, [])
            .then(news => {
            res.json({ success: true, news });
        })
            .catch(error => {
            res.json({ success: false, message: "Lỗi lấy dữ liệu tin tức" });
        });
    }
    DeleteNew(req, res) {
        const id = req.params.id;
        const queryPath = 'Select path from news where id = ?';
        (0, callbackToPromise_1.excuteQuery)(queryPath, [id])
            .then((result) => {
            const data = result;
            if (data.length > 0) {
                const imagePath = data[0].path;
                fs_1.default.unlink(path_1.default.join(__dirname, '../../public', imagePath), err => {
                    if (err)
                        console.log(`Error removing file: ${err}`);
                });
            }
            const query = 'Delete from news where id = ?';
            return (0, callbackToPromise_1.excuteQuery)(query, [id]);
        })
            .then(() => {
            res.json({ success: true });
        })
            .catch(error => {
            console.log(error);
            res.status(500).json({ success: false, message: "Lỗi xóa banner PC" });
        });
    }
}
module.exports = new newController();
