"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../Controller/productController"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
// Cấu hình multer
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/product');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path_1.default.extname(file.originalname);
        // Lưu đường dẫn tương đối vào cơ sở dữ liệu
        req.body.path = `product/${filename}`;
        cb(null, filename);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/createproduct', upload.array('image', 10), productController_1.default.CreateProduct);
router.post('/maincreatecategory', productController_1.default.MainCreateCategory);
router.get('/getmaincategory', productController_1.default.GetMainCategory);
router.delete('/deletemaincategory/:id', productController_1.default.DeleteMainCategory);
router.put('/updatemaincategory/:id', productController_1.default.UpdatMainCategory);
router.post('/createcategory', productController_1.default.CreateCategory);
router.get('/getcategory', productController_1.default.GetCategory);
router.delete('/deletecategory/:id', productController_1.default.DeleteCategory);
router.get('/getcategory/:id', productController_1.default.GetCategoryID);
router.put('/updatecategory/:id', productController_1.default.UpdateCategory);
router.post('/addmanufacturer', productController_1.default.CreateManufacturer);
router.get('/getmanufacturer', productController_1.default.GetManufacturer);
router.delete('/deletemanufacturer/:id', productController_1.default.DeleteManufacturer);
router.put('/updatemanufacturer/:id', productController_1.default.UpdateManufacturer);
module.exports = router;
