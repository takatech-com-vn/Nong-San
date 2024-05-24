"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const brandController_1 = __importDefault(require("../Controller/brandController"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Cấu hình multer
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/brand');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path_1.default.extname(file.originalname);
        // Lưu đường dẫn tương đối vào cơ sở dữ liệu
        req.body.path = `brand/${filename}`;
        cb(null, filename);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const router = express_1.default.Router();
router.post('/createbrand', upload.single('image'), brandController_1.default.CreateBrand);
router.post('/getbrand', brandController_1.default.GetBrand);
module.exports = router;
