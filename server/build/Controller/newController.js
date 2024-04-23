"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const callbackToPromise_1 = require("../util/callbackToPromise");
const path_1 = __importDefault(require("path"));
class newController {
    CreateNew(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log('data: ' + JSON.stringify(data));
            const file = req.file;
            console.log('file: ' + JSON.stringify(file));
            if (file && data.name && data.shortDescription && data.content) {
                const imagePath = path_1.default.join('src/image/newimages', file.filename);
                const query = 'INSERT INTO news (name_new, path, short_description, content, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';
                const params = [data.name, imagePath, data.shortDescription, data.content];
                (0, callbackToPromise_1.excuteQuery)(query, params)
                    .then(result => {
                    res.json({ success: true, message: "Thêm tin tức thành công", result });
                })
                    .catch(error => {
                    res.status(500).json({ success: false, message: "Thêm tin tức thất bại" });
                });
            }
            else {
                console.log("Lỗi rồi");
                res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ hoặc không tìm thấy ảnh" });
            }
        });
    }
    ListNew(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'Select * from news';
            (0, callbackToPromise_1.excuteQuery)(query, [])
                .then(news => {
                res.json({ success: true, news });
            })
                .catch(error => {
                res.json({ success: false, message: "Lỗi lấy dữ liệu tin tức" });
            });
        });
    }
}
module.exports = new newController();
