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
        cb(null, 'public/images/new');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path_1.default.extname(file.originalname);
        // Lưu đường dẫn tương đối vào cơ sở dữ liệu
        req.body.path = `new/${filename}`;
        cb(null, filename);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const router = express_1.default.Router();
router.post('/createnew', upload.single('image'), newController_1.default.CreateNew);
router.get('/getnew', newController_1.default.ListNew);
router.delete('/deletenew/:id', newController_1.default.DeleteNew);
router.get('/getnewid/:id', newController_1.default.GetNewID);
router.put('/updatenew/:id', newController_1.default.UpdateNew);
module.exports = router;
