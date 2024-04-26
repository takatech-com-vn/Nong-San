import express from 'express'
import slideController from '../Controller/slideController'
import multer from 'multer';
import path from 'path';


// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/images/bannerpc');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        // Lưu đường dẫn tương đối vào cơ sở dữ liệu
        req.body.path = `bannerpc/${filename}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

// Cấu hình multer
const storageMobile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/images/bannermobile');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        // Lưu đường dẫn tương đối vào cơ sở dữ liệu
        req.body.path = `bannermobile/${filename}`;
        cb(null, filename);
    }
});
const uploadMobile = multer({ storage: storageMobile });

const router = express.Router();

router.post('/createslide', upload.single('image'), slideController.CreateSlide);
router.post('/createslidemobile', uploadMobile.single('image'), slideController.CreateSlideMobile);

router.get('/getlistslidepc', slideController.ListSlidePC);
router.get('/getlistslidemobile', slideController.ListSlideMobile);

export = router;