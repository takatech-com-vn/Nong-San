import express from 'express';
import brandController from '../Controller/brandController';
import { isAuthenticated } from '../config/configSession';

const router = express.Router();

router.post('/createbrand', brandController.CreateBrand)

export = router