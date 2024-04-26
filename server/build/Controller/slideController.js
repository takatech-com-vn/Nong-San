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
const callbackToPromise_1 = require("../util/callbackToPromise");
class slideController {
    // constructor() {
    //     checkPermissions(); // Gọi hàm checkPermissions khi khởi tạo lớp
    // }
    CreateSlide(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const file = req.file; // Truy cập file từ req.file
            if (file) {
                // Tạo đường dẫn hình ảnh từ req.body.path
                const imagePath = '/images/' + req.body.path;
                const query = 'INSERT INTO banner_pcs (name_bannerpc, path) VALUES (?, ?)';
                const params = [data.name, imagePath];
                (0, callbackToPromise_1.excuteQuery)(query, params)
                    .then(result => {
                    res.json({ success: true, message: "Thêm slide thành công", result });
                })
                    .catch(error => {
                    console.log(error);
                    res.json({ success: false, message: "Thêm slide thất bại" });
                });
            }
            else {
                console.log("Lỗi rồi");
                res.status(400).json({ success: false, message: 'Không có hình ảnh nào được tải lên' });
            }
        });
    }
    CreateSlideMobile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const file = req.file; // Truy cập file từ req.file
            if (file) {
                // Tạo đường dẫn hình ảnh từ req.body.path
                const imagePath = '/images/' + req.body.path;
                const query = 'INSERT INTO banner_mobiles (name_mobilepc, path) VALUES (?, ?)';
                const params = [data.name, imagePath];
                (0, callbackToPromise_1.excuteQuery)(query, params)
                    .then(result => {
                    res.json({ success: true, message: "Thêm slide thành công", result });
                })
                    .catch(error => {
                    res.status(500).json({ success: false, message: "Thêm slide thất bại" });
                });
            }
            else {
                res.status(400).json({ success: false, message: 'Không có hình ảnh nào được tải lên' });
            }
        });
    }
    ListSlidePC(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'Select * from banner_pcs';
            (0, callbackToPromise_1.excuteQuery)(query, [])
                .then(banner_pcs => {
                res.json({ success: true, banner_pcs });
            })
                .catch(error => {
                res.status(500).json({ success: false, message: "Lỗi lấy dữ liệu slide pc" });
            });
        });
    }
    ListSlideMobile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'Select * from banner_mobiles';
            (0, callbackToPromise_1.excuteQuery)(query, [])
                .then(banner_mobiles => {
                res.json({ success: true, banner_mobiles });
            })
                .catch(error => {
                res.status(500).json({ success: false, message: "Lỗi lấy dữ liệu slide mobile" });
            });
        });
    }
}
module.exports = new slideController();
