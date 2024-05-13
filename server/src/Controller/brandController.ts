import { Request, Response } from "express";
import { excuteQuery } from "../util/callbackToPromise";

class brandController {
    CreateBrand (req: Request, res: Response) {
        const data = req.body;
        console.log("data: " + JSON.stringify(data));
        console.log("data: " + data);
    }
}

export = new brandController();