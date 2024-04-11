import { Request, Response } from 'express';
import { connection} from '../config/database/mySQL';

class productController {
    async getproduct(req: Request, res: Response) {
        const data = req.body;
        console.log("data: " + JSON.stringify(data));
    }
}

export = new productController();
