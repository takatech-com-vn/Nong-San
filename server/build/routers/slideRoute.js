"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const slideController_1 = __importDefault(require("../Controller/slideController"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Cấu hình multer
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/bannerpc');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path_1.default.extname(file.originalname);
        // Lưu đường dẫn tương đối vào cơ sở dữ liệu
        req.body.path = `bannerpc/${filename}`;
        cb(null, filename);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
// Cấu hình multer
const storageMobile = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/bannermobile');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path_1.default.extname(file.originalname);
        // Lưu đường dẫn tương đối vào cơ sở dữ liệu
        req.body.path = `bannermobile/${filename}`;
        cb(null, filename);
    }
});
const uploadMobile = (0, multer_1.default)({ storage: storageMobile });
const router = express_1.default.Router();
router.post('/createslide', upload.single('image'), slideController_1.default.CreateSlide);
router.post('/createslidemobile', uploadMobile.single('image'), slideController_1.default.CreateSlideMobile);
router.get('/getlistslidepc', slideController_1.default.ListSlidePC);
router.get('/getlistslidemobile', slideController_1.default.ListSlideMobile);
router.delete('/deletebannerPC/:id', slideController_1.default.DeletebannerPC);
router.delete('/deletebannermobile/:id', slideController_1.default.Deletebannermobile);
router.get('/getslideid/:id', slideController_1.default.GetSlideID);
router.put('/updateslidepc/:id', upload.single('image'), slideController_1.default.UpdateSlidePC);
router.put('/updateslidemb/:id', uploadMobile.single('image'), slideController_1.default.UpdateSlideMB);
module.exports = router;
