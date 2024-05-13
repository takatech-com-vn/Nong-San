import { Request, Response } from 'express';
import { connection} from '../config/database/mySQL';
import { excuteQuery } from '../util/callbackToPromise';
import { error } from 'console';

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

    CreateManufacturer(req: Request, res: Response) {
        const data = req.body;
        console.log("data: " + JSON.stringify(data))

        const query = 'Insert into product_manufacturers(category_id, name) Values (?, ?)'

        const params = [data.categoryId, data.name]

        excuteQuery(query, params)
            .then(result => {
                res.json({ success: true, message: "Thêm hãng sản xuất thành công", result})
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ success: false, message: "Thêm hãng sản xuất thất bại"})
            })
    }

    GetManufacturer(req: Request, res: Response) {
        const query = `
            SELECT product_manufacturers.id, product_manufacturers.name, productcategoris.name_category
            FROM product_manufacturers
            INNER JOIN productcategoris ON product_manufacturers.category_id = productcategoris.id
        `;
    
        excuteQuery(query, [])
            .then((Manufacturer) => {
                res.json({ success: true, Manufacturer})
            })
            .catch(() => {
                res.status(500).json({ success: false, message: "Lấy dữ liệu thất bại"})
            })
    }
    
    DeleteManufacturer(req: Request, res: Response) {
        const id = req.params.id;

        const query = 'Delete from product_manufacturers where id = ?'

        excuteQuery(query, [id])
            .then(() => {
                res.json({ success: true });
            })
            .catch(() => {
                res.status(500).json({ success: false })
            })
    }

    UpdateManufacturer(req: Request, res: Response) {
        const id = req.params.id;
        const name = req.body.name;

        const query = 'Update product_manufacturers set name = ? where id = ?'

        const params = [name, id]

        excuteQuery(query, params)
            .then(reponse => {
                res.json({ success: true, reponse });
            })
            .catch(() => {
                res.json({ success: false, message: "Cập nhật hãng sx thất bại" });
            })
    }
}

export = new productController();
