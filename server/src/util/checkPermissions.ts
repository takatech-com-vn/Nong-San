import fs from 'fs';
import path from 'path';

// Xuất hàm checkPermissions
export function checkPermissions() {
    // Đường dẫn tới thư mục bạn muốn kiểm tra
    const dirPath = path.join(__dirname, 'src/public/images/bannerpc');

    // Kiểm tra xem máy chủ có quyền đọc thư mục hay không
    fs.access(dirPath, fs.constants.R_OK, (err) => {
        if (err) {
            console.log('Máy chủ không có quyền đọc thư mục');
        } else {
            console.log('Máy chủ có quyền đọc thư mục');
        }
    });

    // Kiểm tra xem máy chủ có quyền ghi vào thư mục hay không
    fs.access(dirPath, fs.constants.W_OK, (err) => {
        if (err) {
            console.log('Máy chủ không có quyền ghi vào thư mục');
        } else {
            console.log('Máy chủ có quyền ghi vào thư mục');
        }
    });
}
