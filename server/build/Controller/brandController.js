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
class brandController {
    CreateBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const file = req.file;
            console.log("data: " + JSON.stringify(data));
            // Kiểm tra xem có hình ảnh được tải lên không
            if (!file) {
                console.log("Không tìm thấy hình ảnh");
                return res.status(400).json({ success: false, message: 'Không tìm thấy hình ảnh' });
            }
            const imagePath = '/images/' + req.body.path;
            // Tạo câu lệnh SQL
            const sql = `INSERT INTO brands (user_id, brand_name, owner_name, phone_number, email, business_info, business_address, path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            // Thực hiện câu lệnh SQL
            try {
                const result = yield (0, callbackToPromise_1.excuteQuery)(sql, [data.user, data.tenGianHang, data.tenChuGianHang, data.phoneCaNhan, data.emailCaNhan, JSON.stringify(data), `${data.selectedCity}, ${data.selectedDistrict}, ${data.selectedWard}, ${data.diaChiCongTy}`, imagePath]);
                console.log('Thêm brand thành công: ', result.insertId);
                // Lưu brand_id vào bảng ware_house
                const sqlWarehouse = `INSERT INTO ware_houses (brand_id, name_warehouse, address_warehouse, location_warehouse, phone_warehouse) VALUES (?, ?, ?, ?, ?)`;
                const resultWarehouse = yield (0, callbackToPromise_1.excuteQuery)(sqlWarehouse, [result.insertId, data.tenNguoiLienHe, data.diaChiKhoHang, data.toaDoKhoHang, data.phoneKhoHang]);
                console.log('Thêm warehouse thành công: ', resultWarehouse.insertId);
                // Cập nhật cột 'role' trong bảng 'users'
                const sqlUpdateRole = `UPDATE users SET role = 'Brand' WHERE id = ?`;
                yield (0, callbackToPromise_1.excuteQuery)(sqlUpdateRole, [data.user]);
                res.json({ success: true, message: 'Thêm brand và warehouse thành công' });
            }
            catch (error) {
                console.error(error);
                // Xóa hình ảnh đã được lưu nếu có lỗi
                fs_1.default.unlink(path_1.default.join(__dirname, '../../public', imagePath), err => {
                    if (err)
                        console.log(`Error removing file: ${err}`);
                });
                res.status(500).json({ success: false, message: 'Thêm brand và warehouse thất bại' });
            }
        });
    }
    GetBrand(req, res) {
        const id = req.body.userId;
        const query = 'Select id, brand_name, owner_name, path from brands where user_id = ?';
        (0, callbackToPromise_1.excuteQuery)(query, id)
            .then(brands => {
            res.json({ success: true, brands });
        })
            .catch(error => {
            console.log(error);
            res.status(500).json({ success: false, message: "Lấy dữ liệu brand không thành công" });
        });
    }
}
module.exports = new brandController();
