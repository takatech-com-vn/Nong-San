import express from 'express';
import brandController from '../Controller/brandController';
import { isAuthenticated } from '../config/configSession';

const router = express.Router();

router.post('/createbrand', isAuthenticated, brandController.CreateBrand)

export = router