"use strict";
const callbackToPromise_1 = require("../util/callbackToPromise");
class policyController {
    CreatePolicy(req, res) {
        const data = req.body;
        const query = 'INSERT INTO policis (name, content) VALUES (?, ?)';
        const params = [data.name, data.content];
        (0, callbackToPromise_1.excuteQuery)(query, params)
            .then(result => {
            res.status(200).json({ success: true, message: 'Thêm chính sách thành công', result });
        })
            .catch(error => {
            console.log(error);
            res.status(500).json({ success: false, message: "Thêm chính sách thất bại" });
        });
    }
    ListPolicy(req, res) {
        const query = 'Select * from policis';
        (0, callbackToPromise_1.excuteQuery)(query, [])
            .then(policis => {
            res.json({ success: true, policis });
        })
            .catch(error => {
            res.status(500).json({ success: false, message: "Lấy dữ liệu chính sách thất bại" });
        });
    }
    DeletePolicy(req, res) {
        const id = req.params.id;
        const query = 'Delete from policis where id = ?';
        (0, callbackToPromise_1.excuteQuery)(query, [id])
            .then(() => {
            res.json({ success: true });
        })
            .catch(error => {
            res.status(500).json({ success: false });
        });
    }
}
module.exports = new policyController();
