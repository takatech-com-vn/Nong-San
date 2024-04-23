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
        cb(null, 'src/image/bannerpc');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); // Thêm timestamp vào tên file để tránh trùng lặp
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const storageMobile = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/image/bannermobile');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); // Thêm timestamp vào tên file để tránh trùng lặp
    }
});
const uploadMobile = (0, multer_1.default)({ storage: storageMobile });
const router = express_1.default.Router();
router.post('/createslide', upload.single('image'), slideController_1.default.CreateSlide);
router.post('/createslidemobile', uploadMobile.single('image'), slideController_1.default.CreateSlideMobile);
router.get('/getlistslidepc', slideController_1.default.ListSlidePC);
router.get('/getlistslidemobile', slideController_1.default.ListSlideMobile);
module.exports = router;
