import express, {Application, Request, Response} from 'express';
import productController from '../Controller/productController';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/product');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        // Lưu đường dẫn tương đối vào cơ sở dữ liệu
        req.body.path = `product/${filename}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

router.post('/createproduct', upload.array('image', 10), productController.CreateProduct);

router.post('/maincreatecategory', productController.MainCreateCategory);
router.get('/getmaincategory', productController.GetMainCategory);
router.delete('/deletemaincategory/:id', productController.DeleteMainCategory);
router.put('/updatemaincategory/:id', productController.UpdatMainCategory);

router.post('/createcategory', productController.CreateCategory);
router.get('/getcategory', productController.GetCategory);
router.delete('/deletecategory/:id', productController.DeleteCategory);
router.get('/getcategory/:id', productController.GetCategoryID);
router.put('/updatecategory/:id', productController.UpdateCategory);

router.post('/addmanufacturer', productController.CreateManufacturer);
router.get('/getmanufacturer', productController.GetManufacturer);
router.delete('/deletemanufacturer/:id', productController.DeleteManufacturer);
router.put('/updatemanufacturer/:id', productController.UpdateManufacturer);

export = router;

