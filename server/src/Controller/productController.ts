import { Request, Response } from 'express';
import { excuteQuery } from '../util/callbackToPromise';

class productController {

    MainCreateCategory(req: Request, res: Response) {
        const name = req.body.name;

        const query = 'Insert into maincategoris (name) Values (?)';
        const params = [name];

        excuteQuery(query, params)
            .then(() => {
                res.json({ success: true, message: "Thêm phân loại chính thành công"});
            })
            .catch(() => {
                res.status(500).json({ success: false, message: "Thêm phân loại chính thất bại"});
            })
    }

    GetMainCategory (req: Request, res: Response) {
        const query = 'Select * from maincategoris'

        excuteQuery(query, [])
            .then(maincategoris => {
                res.json({ success: true, maincategoris });
            })
            .catch(() => {
                res.json({ success: false })
            })
    }

    DeleteMainCategory(req: Request, res: Response) {
        const id = req.params.id;

        const query = 'Delete from maincategoris where id = ?'

        excuteQuery(query, [id])
            .then(() => {
                res.json({ success: true });
            })
            .catch(() => {
                res.status(500).json({ success: false })
            })
    }

    UpdatMainCategory(req: Request, res: Response) {
        const id = req.params.id;
        const name = req.body.name;

        const query = 'Update maincategoris set name = ? where id = ?'
        const params = [name, id]

        excuteQuery(query, params)
            .then(reponse => {
                res.json({ success: true, reponse });
            })
            .catch(() => {
                res.json({ success: false, message: "Cập nhật phân loại thất bại" });
            })
    }
    
    CreateCategory(req: Request, res: Response) {
        const data = req.body;
        
        const query = 'Insert into productcategoris (maincategory_id, name_category) Values (?, ?)';
        const params = [data.maincategoryId, data.name];
        excuteQuery(query, params)
            .then(() => {
                res.json({ success: true, message: "Thêm phân loại thành công"});
            })
            .catch(() => {
                res.status(500).json({ success: false, message: "Thêm phân loại thất bại"});
            })
    }

    GetCategory(req: Request, res: Response) {
        const query = `
            SELECT productcategoris.id, productcategoris.maincategory_id, productcategoris.name_category, maincategoris.name
            FROM productcategoris
            INNER JOIN maincategoris ON productcategoris.maincategory_id = maincategoris.id
            `;

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
        const maincategory_id = req.body.maincategory_id;
        const name = req.body.name;
    
        const query = 'UPDATE productcategoris SET name_category = ?, maincategory_id = ? WHERE id = ?';
        const params = [name, maincategory_id, id];
    
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
        // console.log("data: " + JSON.stringify(data))

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
            SELECT product_manufacturers.id, product_manufacturers.category_id, product_manufacturers.name, productcategoris.name_category, maincategoris.name as maincategory_name
            FROM product_manufacturers
            INNER JOIN productcategoris ON product_manufacturers.category_id = productcategoris.id
            INNER JOIN maincategoris ON productcategoris.maincategory_id = maincategoris.id
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
        const category_id = req.body.category_id;
        const name = req.body.name;

        const query = 'Update product_manufacturers set name = ?, category_id =? where id = ?';
        const params = [name, category_id, id]

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
