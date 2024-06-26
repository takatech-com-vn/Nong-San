import express from 'express';
import newController from '../Controller/newController';
import multer from 'multer';
import path from 'path';
import { isAuthenticated } from '../config/configSession';

// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/new');
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
router.delete('/deletenew/:id',newController.DeleteNew);
router.get('/getnewid/:id',newController.GetNewID);
router.put('/updatenew/:id', upload.single('image'), newController.UpdateNew);

export = router