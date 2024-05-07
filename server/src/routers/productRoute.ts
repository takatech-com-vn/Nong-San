import express, {Application, Request, Response} from 'express';
import productController from '../Controller/productController';

const router = express.Router();

router.post('/createcategory', productController.CreateCategory);
router.get('/getcategory', productController.GetCategory);
router.delete('/deletecategory/:id', productController.DeleteCategory);
router.get('/getcategory/:id', productController.GetCategoryID);
router.put('/updatecategory/:id', productController.UpdateCategory);

export = router;

