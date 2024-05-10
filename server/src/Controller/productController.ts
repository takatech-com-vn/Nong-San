import { Request, Response } from 'express';
import { connection} from '../config/database/mySQL';
import { excuteQuery } from '../util/callbackToPromise';

class productController {
    
    CreateCategory(req: Request, res: Response) {
        const name = req.body.name;
        
        const query = 'Insert into productcategoris (name_category) Values (?)';
        const params = [name];
        excuteQuery(query, params)
            .then(() => {
                res.json({ success: true, message: "Thêm phân loại thành công"});
            })
            .catch(() => {
                res.status(500).json({ success: false, message: "Thêm phân loại thất bại"});
            })
    }

    GetCategory(req: Request, res: Response) {
        const query = 'Select * from productcategoris'

        excuteQuery(query, [])
            .then(productcategoris => {
                res.json({ success: true, productcategoris });
            })
            .catch(() => {
                res.json({ success: false })
            })
    }

    GetCategoryID(req: Request, res: Response) {
        const id = req.params.id;

        const query = 'Select from productcategoris where id = ?'
        
        excuteQuery(query, [id])
            .then(productcategoris => {
                res.json({ success: true, productcategoris });
            })
            .catch(() => {
                res.json({ success: false});
            })
    }

    DeleteCategory(req: Request, res: Response) {
        const id = req.params.id;

        const query = 'Delete from productcategoris where id = ?'

        excuteQuery(query, [id])
            .then(() => {
                res.json({ success: true });
            })
            .catch(() => {
                res.status(500).json({ success: false })
            })
    }

    UpdateCategory(req: Request, res: Response) {
        const id = req.params.id;
        const name = req.body.name;
        console.log("id: " + JSON.stringify(id))
        console.log("name: " + JSON.stringify(name));

        const query = 'Update productcategoris set name_category = ? where id = ?'
        const params = [name, id]

        excuteQuery(query, params)
            .then(reponse => {
                res.json({ success: true, reponse });
            })
            .catch(() => {
                res.json({ success: false, message: "Cập nhật phân loại thất bại" });
            })
    }
}

export = new productController();
