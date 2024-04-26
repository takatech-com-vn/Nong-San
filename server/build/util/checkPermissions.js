"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermissions = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Xuất hàm checkPermissions
function checkPermissions() {
    // Đường dẫn tới thư mục bạn muốn kiểm tra
    const dirPath = path_1.default.join(__dirname, 'src/public/images/bannerpc');
    // Kiểm tra xem máy chủ có quyền đọc thư mục hay không
    fs_1.default.access(dirPath, fs_1.default.constants.R_OK, (err) => {
        if (err) {
            console.log('Máy chủ không có quyền đọc thư mục');
        }
        else {
            console.log('Máy chủ có quyền đọc thư mục');
        }
    });
    // Kiểm tra xem máy chủ có quyền ghi vào thư mục hay không
    fs_1.default.access(dirPath, fs_1.default.constants.W_OK, (err) => {
        if (err) {
            console.log('Máy chủ không có quyền ghi vào thư mục');
        }
        else {
            console.log('Máy chủ có quyền ghi vào thư mục');
        }
    });
}
exports.checkPermissions = checkPermissions;
