"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../Controller/productController"));
const router = express_1.default.Router();
router.post('/createcategory', productController_1.default.CreateCategory);
router.get('/getcategory', productController_1.default.GetCategory);
router.delete('/deletecategory/:id', productController_1.default.DeleteCategory);
router.get('/getcategory/:id', productController_1.default.GetCategoryID);
router.put('/updatecategory/:id', productController_1.default.UpdateCategory);
module.exports = router;
