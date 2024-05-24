import express from 'express';
import brandController from '../Controller/brandController';
import { isAuthenticated } from '../config/configSession';
import multer from 'multer';
import path from 'path';

// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/brand');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        // Lưu đường dẫn tương đối vào cơ sở dữ liệu
        req.body.path = `brand/${filename}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/createbrand', upload.single('image'), brandController.CreateBrand)

export = router