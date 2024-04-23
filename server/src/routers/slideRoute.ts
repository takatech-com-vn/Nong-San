import express from 'express'
import slideController from '../Controller/slideController'
import multer from 'multer';
import path from 'path';

// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/image/bannerpc');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Thêm timestamp vào tên file để tránh trùng lặp
    }
});
const upload = multer({ storage: storage });

const storageMobile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/image/bannermobile');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Thêm timestamp vào tên file để tránh trùng lặp
    }
});
const uploadMobile = multer({ storage: storageMobile });

const router = express.Router();

router.post('/createslide', upload.single('image'), slideController.CreateSlide);
router.post('/createslidemobile', uploadMobile.single('image'), slideController.CreateSlideMobile);

router.get('/getlistslidepc', slideController.ListSlidePC);
router.get('/getlistslidemobile', slideController.ListSlideMobile);

export = router;