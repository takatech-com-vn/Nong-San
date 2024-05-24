"use strict";
const callbackToPromise_1 = require("../util/callbackToPromise");
class wareHouseController {
    GetWareHouse(req, res) {
        const id = req.body.id;
        const query = 'Select * from ware_houses where brand_id = ?';
        (0, callbackToPromise_1.excuteQuery)(query, id)
            .then(ware_houses => {
            res.json({ success: true, ware_houses });
        })
            .catch(error => {
            res.status(500).json({ success: false, message: "Lấy dữ liệu chính sách thất bại" });
        });
    }
}
module.exports = new wareHouseController();
