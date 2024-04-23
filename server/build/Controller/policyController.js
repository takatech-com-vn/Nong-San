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
class policyController {
    CreatePolicy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log('policy: ' + JSON.stringify(data));
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
        });
    }
    ListPolicy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'Select * from policis';
            (0, callbackToPromise_1.excuteQuery)(query, [])
                .then(policis => {
                res.json({ success: true, policis });
            })
                .catch(error => {
                res.status(500).json({ success: false, message: "Lấy dữ liệu chính sách thất bại" });
            });
        });
    }
}
module.exports = new policyController();
