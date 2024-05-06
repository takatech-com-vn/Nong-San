import express from 'express'
import slideController from '../Controller/slideController'
import multer from 'multer';
import path from 'path';
import { isAuthenticated } from '../config/configSession';

// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/bannerpc');
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
        cb(null, 'public/images/bannermobile');
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

router.delete('/deletebannerPC/:id', slideController.DeletebannerPC);
router.delete('/deletebannermobile/:id', slideController.Deletebannermobile);
router.get('/getslideid/:id', slideController.GetSlideID);
router.put('/updateslidepc/:id', upload.single('image'), slideController.UpdateSlidePC);
router.put('/updateslidemb/:id', uploadMobile.single('image'), slideController.UpdateSlideMB);

export = router;