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
const fs_1 = __importDefault(require("fs"));
class slideController {
    constructor() {
        // constructor() {
        //     checkPermissions(); // Gọi hàm checkPermissions khi khởi tạo lớp
        // }
        this.getSlidePCById = (id) => __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM banner_pcs WHERE id = ?';
            const params = [id];
            try {
                const result = yield (0, callbackToPromise_1.excuteQuery)(query, params);
                if (result.length > 0) {
                    return result[0]; // Trả về slide đầu tiên (và duy nhất) từ kết quả
                }
                else {
                    throw new Error('Không tìm thấy slide với id: ' + id);
                }
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
        this.UpdateSlidePC = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const name = req.body.name;
            const file = req.file; // Truy cập file từ req.file
            // Lấy thông tin về slide hiện tại từ cơ sở dữ liệu
            const currentSlide = yield this.getSlidePCById(id);
            // Kiểm tra xem currentSlide có tồn tại không
            if (!currentSlide) {
                console.log("Không tìm thấy slide với id: " + id);
                res.status(404).json({ success: false, message: 'Không tìm thấy slide' });
                return;
            }
            let imagePath = currentSlide.path; // Sử dụng đường dẫn hình ảnh hiện tại nếu không có hình ảnh mới
            if (file) {
                // Tạo đường dẫn hình ảnh từ req.body.path
                imagePath = '/images/' + req.body.path;
                // Xóa hình ảnh cũ từ thư mục trên máy chủ
                fs_1.default.unlink(path_1.default.join(__dirname, '../../public', currentSlide.path), err => {
                    if (err)
                        console.log(`Error removing file: ${err}`);
                });
            }
            const query = 'UPDATE banner_pcs SET name = ?, path = ? WHERE id = ?';
            const params = [name, imagePath, id];
            (0, callbackToPromise_1.excuteQuery)(query, params)
                .then(result => {
                res.json({ success: true, message: "Cập nhật slide thành công", result });
            })
                .catch(error => {
                console.log(error);
                // Xóa hình ảnh mới đã được lưu nếu có lỗi
                if (file) {
                    fs_1.default.unlink(path_1.default.join(__dirname, '../../public', imagePath), err => {
                        if (err)
                            console.log(`Error removing file: ${err}`);
                    });
                }
                res.json({ success: false, message: "Cập nhật slide thất bại" });
            });
        });
        this.getSlideMBById = (id) => __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM banner_mobiles WHERE id = ?';
            const params = [id];
            try {
                const result = yield (0, callbackToPromise_1.excuteQuery)(query, params);
                if (result.length > 0) {
                    return result[0]; // Trả về slide đầu tiên (và duy nhất) từ kết quả
                }
                else {
                    throw new Error('Không tìm thấy slide với id: ' + id);
                }
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
        this.UpdateSlideMB = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const name = req.body.name;
            const file = req.file; // Truy cập file từ req.file
            // Lấy thông tin về slide hiện tại từ cơ sở dữ liệu
            const currentSlide = yield this.getSlideMBById(id);
            // Kiểm tra xem currentSlide có tồn tại không
            if (!currentSlide) {
                console.log("Không tìm thấy slide với id: " + id);
                res.status(404).json({ success: false, message: 'Không tìm thấy slide' });
                return;
            }
            let imagePath = currentSlide.path; // Sử dụng đường dẫn hình ảnh hiện tại nếu không có hình ảnh mới
            if (file) {
                // Tạo đường dẫn hình ảnh từ req.body.path
                imagePath = '/images/' + req.body.path;
                // Xóa hình ảnh cũ từ thư mục trên máy chủ
                fs_1.default.unlink(path_1.default.join(__dirname, '../../public', currentSlide.path), err => {
                    if (err)
                        console.log(`Error removing file: ${err}`);
                });
            }
            const query = 'UPDATE banner_mobiles SET name = ?, path = ? WHERE id = ?';
            const params = [name, imagePath, id];
            (0, callbackToPromise_1.excuteQuery)(query, params)
                .then(result => {
                res.json({ success: true, message: "Cập nhật slide thành công", result });
            })
                .catch(error => {
                console.log(error);
                // Xóa hình ảnh mới đã được lưu nếu có lỗi
                if (file) {
                    fs_1.default.unlink(path_1.default.join(__dirname, '../../public', imagePath), err => {
                        if (err)
                            console.log(`Error removing file: ${err}`);
                    });
                }
                res.json({ success: false, message: "Cập nhật slide thất bại" });
            });
        });
    }
    CreateSlide(req, res) {
        const data = req.body;
        const file = req.file; // Truy cập file từ req.file
        console.log("data: " + JSON.stringify(data));
        if (file) {
            // Tạo đường dẫn hình ảnh từ req.body.path
            const imagePath = '/images/' + req.body.path;
            const query = 'INSERT INTO banner_pcs (name, path) VALUES (?, ?)';
            const params = [data.name, imagePath];
            (0, callbackToPromise_1.excuteQuery)(query, params)
                .then(result => {
                res.json({ success: true, message: "Thêm slide thành công", result });
            })
                .catch(error => {
                console.log(error);
                // Xóa hình ảnh đã được lưu nếu có lỗi
                fs_1.default.unlink(path_1.default.join(__dirname, '../../public', imagePath), err => {
                    if (err)
                        console.log(`Error removing file: ${err}`);
                });
                res.json({ success: false, message: "Thêm slide thất bại" });
            });
        }
        else {
            console.log("Lỗi rồi");
            res.status(400).json({ success: false, message: 'Không có hình ảnh nào được tải lên' });
        }
    }
    CreateSlideMobile(req, res) {
        const data = req.body;
        const file = req.file; // Truy cập file từ req.file
        if (file) {
            // Tạo đường dẫn hình ảnh từ req.body.path
            const imagePath = '/images/' + req.body.path;
            const query = 'INSERT INTO banner_mobiles (name, path) VALUES (?, ?)';
            const params = [data.name, imagePath];
            (0, callbackToPromise_1.excuteQuery)(query, params)
                .then(result => {
                res.json({ success: true, message: "Thêm slide thành công", result });
            })
                .catch(error => {
                // Xóa hình ảnh đã được lưu nếu có lỗi
                fs_1.default.unlink(path_1.default.join(__dirname, '../../public', imagePath), err => {
                    if (err)
                        console.log(`Error removing file: ${err}`);
                });
                res.status(500).json({ success: false, message: "Thêm slide thất bại" });
            });
        }
        else {
            res.status(400).json({ success: false, message: 'Không có hình ảnh nào được tải lên' });
        }
    }
    ListSlidePC(req, res) {
        const query = 'Select * from banner_pcs';
        (0, callbackToPromise_1.excuteQuery)(query, [])
            .then(banner_pcs => {
            res.json({ success: true, banner_pcs });
        })
            .catch(error => {
            res.status(500).json({ success: false, message: "Lỗi lấy dữ liệu slide pc" });
        });
    }
    ListSlideMobile(req, res) {
        const query = 'Select * from banner_mobiles';
        (0, callbackToPromise_1.excuteQuery)(query, [])
            .then(banner_mobiles => {
            res.json({ success: true, banner_mobiles });
        })
            .catch(error => {
            res.status(500).json({ success: false, message: "Lỗi lấy dữ liệu slide mobile" });
        });
    }
    DeletebannerPC(req, res) {
        const id = req.params.id;
        const queryPath = 'Select path from banner_pcs where id = ?';
        (0, callbackToPromise_1.excuteQuery)(queryPath, id)
            .then((result) => {
            const data = result;
            if (data.length > 0) {
                const imagePath = data[0].path;
                //Xóa hình ảnh từ thư mục
                fs_1.default.unlink(path_1.default.join(__dirname, '../../public', imagePath), err => {
                    if (err)
                        console.log(`Error removing file: ${err}`);
                });
            }
            //Xóa banner trong csdl
            const query = 'Delete from banner_pcs where id = ?';
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
    ;
    Deletebannermobile(req, res) {
        const id = req.params.id;
        const queryPath = 'Select path from banner_mobiles where id = ?';
        (0, callbackToPromise_1.excuteQuery)(queryPath, id)
            .then((result) => {
            const data = result;
            if (data.length > 0) {
                const imagePath = data[0].path;
                fs_1.default.unlink(path_1.default.join(__dirname, '../../public', imagePath), err => {
                    if (err)
                        console.log(`Error removing file: ${err}`);
                });
            }
            const query = 'Delete from banner_mobiles where id = ?';
            return (0, callbackToPromise_1.excuteQuery)(query, [id]);
        })
            .then(() => {
            res.json({ success: true });
        })
            .catch(error => {
            console.log(error);
            res.status(500).json({ success: false, message: "Lỗi xóa banner Mobile" });
        });
    }
    GetSlideID(req, res) {
        const id = req.params.id;
        const query = 'Select * from banner_pcs where id = ?';
        (0, callbackToPromise_1.excuteQuery)(query, [id])
            .then(banner_pcs => {
            res.json({ success: true, banner_pcs });
        })
            .catch(() => {
            res.status(500).json({ success: false, message: "Lỗi lấy dữ liệu" });
        });
    }
}
module.exports = new slideController();
