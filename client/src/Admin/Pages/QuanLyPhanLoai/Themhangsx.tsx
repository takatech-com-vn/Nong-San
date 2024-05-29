import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductCategory } from '../../../services/ProductCategory';
import {
  Button,
  Form,
  Input,
  message,
  Select
} from "antd";

function Themhangsx() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_API_URL}/product/getcategory`)
      .then(response => {
        if (response.data.success) {
          setCategories(response.data.productcategoris);
        } else {
          console.error('Failed to fetch categories');
        }
      })
      .catch(error => {
        console.error('An error occurred while fetching categories:', error);
      });
  }, []);

  const handleSubmit = async () => {
    if (selectedCategory === null) {
      message.error('Vui lòng chọn một phân loại');
      return;
    }

    const manufacturer = {
      categoryId: selectedCategory,
      name,
    };

    axios.post(`${import.meta.env.VITE_APP_API_URL}/product/addmanufacturer`, manufacturer)
      .then(response => {
        if (response.data.success) {
          message.success('Thêm hãng sản xuất thành công');
        } else {
          message.error('Có lỗi xảy ra khi thêm hãng sản xuất');
        }
      })
      .catch(error => {
        console.error('An error occurred while adding the manufacturer:', error);
        message.error('Có lỗi xảy ra khi thêm hãng sản xuất');
      });
  }

  return (
    <Form className="w-full rounded" onFinish={handleSubmit} layout="vertical">
      <div className="flex flex-row gap-2">
        <div className="w-full">
          <Form.Item label="Phân loại" name="categories">
            <Select onChange={value => setSelectedCategory(value)} placeholder='Chọn phân loại'>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name_category}
                </option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="w-full">
          <Form.Item label="Tên hãng sản xuất" name="name">
            <Input placeholder="Nhập tên hãng sản xuất" maxLength={100} showCount onChange={e => setName(e.target.value)} />
          </Form.Item>
        </div>
      </div>

      <div className='flex w-full justify-end'>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm hãng sản xuất
          </Button>
        </Form.Item>
      </div >
    </Form>
  );
}

export default Themhangsx;
