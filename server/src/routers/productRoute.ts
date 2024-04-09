import express, {Application, Request, Response} from 'express';
import productController from '../Controller/productController';

const router = express.Router();

router.get('/getproduct', productController.getproduct);

export = router;

