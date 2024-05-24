import { Request, Response } from "express";
import { excuteQuery } from "../util/callbackToPromise";
import path from "path";
import fs from 'fs';

class brandController {
    async CreateBrand (req: Request, res: Response) {
        const data = req.body;
        const file = req.file;
        console.log("data: " + JSON.stringify(data));
    
        // Kiểm tra xem có hình ảnh được tải lên không
        if (!file) {
            console.log("Không tìm thấy hình ảnh")
            return res.status(400).json({ success: false, message: 'Không tìm thấy hình ảnh' });
        }
    
        const imagePath = '/images/' + req.body.path;
        // Tạo câu lệnh SQL
        const sql = `INSERT INTO brands (user_id, brand_name, owner_name, phone_number, email, business_info, business_address, path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
        // Thực hiện câu lệnh SQL
        try {
            const result = await excuteQuery(sql, [data.user, data.tenGianHang, data.tenChuGianHang, data.phoneCaNhan, data.emailCaNhan, JSON.stringify(data), `${data.selectedCity}, ${data.selectedDistrict}, ${data.selectedWard}, ${data.diaChiCongTy}`, imagePath]) as any;
            console.log('Thêm brand thành công: ', result.insertId);
    
            // Lưu brand_id vào bảng ware_house
            const sqlWarehouse = `INSERT INTO ware_houses (brand_id, name_warehouse, address_warehouse, location_warehouse, phone_warehouse) VALUES (?, ?, ?, ?, ?)`;
    
            const resultWarehouse = await excuteQuery(sqlWarehouse, [result.insertId, data.tenNguoiLienHe, data.diaChiKhoHang, data.toaDoKhoHang, data.phoneKhoHang]) as any;
            console.log('Thêm warehouse thành công: ', resultWarehouse.insertId);
    
            // Cập nhật cột 'role' trong bảng 'users'
            const sqlUpdateRole = `UPDATE users SET role = 'Brand' WHERE id = ?`;
    
            await excuteQuery(sqlUpdateRole, [data.user]);
    
            res.json({ success: true, message: 'Thêm brand và warehouse thành công' });
        } catch (error) {
            console.error(error);
            // Xóa hình ảnh đã được lưu nếu có lỗi
            fs.unlink(path.join(__dirname, '../../public', imagePath), err => {
                if (err) console.log(`Error removing file: ${err}`);
            });
            res.status(500).json({ success: false, message: 'Thêm brand và warehouse thất bại' });
        }
    }    
}

export = new brandController();