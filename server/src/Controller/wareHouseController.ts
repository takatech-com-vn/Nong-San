import { Request, Response } from "express";
import { excuteQuery } from "../util/callbackToPromise";

class wareHouseController {
    GetWareHouse(req: Request, res: Response) {
        const query = 'Select * from ware_houses';

        excuteQuery(query, [])
            .then(ware_houses => {
                res.json({ success: true, ware_houses});
            })
            .catch(error => {
                res.status(500).json({ success: false, message: "Lấy dữ liệu chính sách thất bại"});
            })
    }
}

export = new wareHouseController();