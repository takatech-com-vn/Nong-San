import express from 'express';
import newController from '../Controller/newController';
import multer from 'multer';
import path from 'path';

// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/images/new');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        // Lưu đường dẫn tương đối vào cơ sở dữ liệu
        req.body.path = `new/${filename}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/createnew', upload.single('image'), newController.CreateNew);
router.get('/getnew', newController.ListNew);

export = router