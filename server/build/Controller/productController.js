"use strict";
const callbackToPromise_1 = require("../util/callbackToPromise");
class productController {
    CreateCategory(req, res) {
        const name = req.body.name;
        const query = 'Insert into productcategoris (name_category) Values (?)';
        const params = [name];
        (0, callbackToPromise_1.excuteQuery)(query, params)
            .then(() => {
            res.json({ success: true, message: "Thêm phân loại thành công" });
        })
            .catch(() => {
            res.status(500).json({ success: false, message: "Thêm phân loại thất bại" });
        });
    }
    GetCategory(req, res) {
        const query = 'Select * from productcategoris';
        (0, callbackToPromise_1.excuteQuery)(query, [])
            .then(productcategoris => {
            res.json({ success: true, productcategoris });
        })
            .catch(() => {
            res.json({ success: false });
        });
    }
    GetCategoryID(req, res) {
        const id = req.params.id;
        const query = 'Select from productcategoris where id = ?';
        (0, callbackToPromise_1.excuteQuery)(query, [id])
            .then(productcategoris => {
            res.json({ success: true, productcategoris });
        })
            .catch(() => {
            res.json({ success: false });
        });
    }
    DeleteCategory(req, res) {
        const id = req.params.id;
        const query = 'Delete from productcategoris where id = ?';
        (0, callbackToPromise_1.excuteQuery)(query, [id])
            .then(() => {
            res.json({ success: true });
        })
            .catch(() => {
            res.status(500).json({ success: false });
        });
    }
    UpdateCategory(req, res) {
        const id = req.params.id;
        const name = req.body.name;
        const query = 'Update productcategoris set name_category = ? where id = ?';
        const params = [name, id];
        (0, callbackToPromise_1.excuteQuery)(query, params)
            .then(reponse => {
            res.json({ success: true, reponse });
        })
            .catch(() => {
            res.json({ success: false, message: "Cập nhật phân loại thất bại" });
        });
    }
    CreateManufacturer(req, res) {
        const data = req.body;
        console.log("data: " + JSON.stringify(data));
        const query = 'Insert into product_manufacturers(category_id, name) Values (?, ?)';
        const params = [data.categoryId, data.name];
        (0, callbackToPromise_1.excuteQuery)(query, params)
            .then(result => {
            res.json({ success: true, message: "Thêm hãng sản xuất thành công", result });
        })
            .catch(error => {
            console.log(error);
            res.status(500).json({ success: false, message: "Thêm hãng sản xuất thất bại" });
        });
    }
    GetManufacturer(req, res) {
        const query = `
            SELECT product_manufacturers.id, product_manufacturers.name, productcategoris.name_category
            FROM product_manufacturers
            INNER JOIN productcategoris ON product_manufacturers.category_id = productcategoris.id
        `;
        (0, callbackToPromise_1.excuteQuery)(query, [])
            .then((Manufacturer) => {
            res.json({ success: true, Manufacturer });
        })
            .catch(() => {
            res.status(500).json({ success: false, message: "Lấy dữ liệu thất bại" });
        });
    }
    DeleteManufacturer(req, res) {
        const id = req.params.id;
        const query = 'Delete from product_manufacturers where id = ?';
        (0, callbackToPromise_1.excuteQuery)(query, [id])
            .then(() => {
            res.json({ success: true });
        })
            .catch(() => {
            res.status(500).json({ success: false });
        });
    }
    UpdateManufacturer(req, res) {
        const id = req.params.id;
        const name = req.body.name;
        const query = 'Update product_manufacturers set name = ? where id = ?';
        const params = [name, id];
        (0, callbackToPromise_1.excuteQuery)(query, params)
            .then(reponse => {
            res.json({ success: true, reponse });
        })
            .catch(() => {
            res.json({ success: false, message: "Cập nhật hãng sx thất bại" });
        });
    }
}
module.exports = new productController();
