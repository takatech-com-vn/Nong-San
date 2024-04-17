export interface User {
  id: number;
  username: string;
  password: string;
  phone: string; // Thêm thuộc tính này
  role: 'Admin' | 'Brand' | 'Customer';
  created_at: Date;
  updated_at: Date;
}
  