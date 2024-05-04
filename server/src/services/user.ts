export interface User {
  id: number;
  username: string;
  password: string;
  phone: string;
  role: 'Admin' | 'Brand' | 'Customer';
  created_at: Date;
  updated_at: Date;
}
  