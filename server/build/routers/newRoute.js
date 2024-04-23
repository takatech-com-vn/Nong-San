"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const newController_1 = __importDefault(require("../Controller/newController"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Cấu hình multer
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/image/newimages');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); // Thêm timestamp vào tên file để tránh trùng lặp
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const router = express_1.default.Router();
router.post('/createnew', upload.single('image'), newController_1.default.CreateNew);
router.get('/getnew', newController_1.default.ListNew);
module.exports = router;
