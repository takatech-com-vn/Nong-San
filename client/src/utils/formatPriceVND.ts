// utils/formatPriceVND.ts

export function formatPriceVND(price: number): string {
    // Chuyển đổi giá trị thành số (nếu nó chưa phải là số)
    price = parseFloat(price.toString()); // Chuyển sang chuỗi trước khi chuyển sang số
  
    // Xử lý trường hợp giá trị không hợp lệ (NaN hoặc Infinity)
    if (isNaN(price) || !isFinite(price)) {
      return "Giá trị không hợp lệ";
    }
  
    // Sử dụng Intl.NumberFormat để định dạng
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0, // Không hiển thị số lẻ
    });
  
    return formatter.format(price);
  }
  