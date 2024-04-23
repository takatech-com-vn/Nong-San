import express, {Application, Request, Response} from 'express';
import productController from '../Controller/productController';

const router = express.Router();

router.post('/createproduct', productController.createProduct);

export = router;

