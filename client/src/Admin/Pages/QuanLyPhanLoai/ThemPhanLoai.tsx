import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  message,
  Select
} from "antd";
import axios from 'axios';
import { MainCategory } from '../../../services/MainCategory';

function ThemPhanLoai() {
  const [maincategories, setMainCategories] = useState<MainCategory[]>([]);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_API_URL}/product/getmaincategory`)
      .then(response => {
        if (response.data.success) {
          setMainCategories(response.data.maincategoris);
        } else {
          console.error('Failed to fetch categories');
        }
      })
      .catch(error => {
        console.error('An error occurred while fetching categories:', error);
      });
  }, []);

  const handleSubmit = () => {
    if (selectedCategory === null) {
      message.error('Vui lòng chọn một phân loại');
      return;
    }

    const categoryData = {
      maincategoryId: selectedCategory,
      name: name,
    };

    axios.post(`${import.meta.env.VITE_APP_API_URL}/product/createcategory`, categoryData)
      .then(reponse => {
        message.success("Thêm phân loại thành công", reponse.data.success);
      })
      .catch(() => {
        message.error("Thêm phân loại thất bại");
      })
  }



  return (
    <Form className="w-full rounded" onFinish={handleSubmit} layout="vertical">
      <div className="flex flex-row gap-2">
        <div className="w-full">
          <Form.Item label="Phân loại chính" name="maincategories">
            <Select onChange={value => setSelectedCategory(value)} placeholder='Chọn phân loại chính'>
              {maincategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </Form.Item>

        </div>

        <div className="w-full">
          <Form.Item label="Tên phân loại" name="name">
            <Input placeholder="Nhập tên sản phẩm phân loại" maxLength={150} showCount onChange={e => setName(e.target.value)} />
          </Form.Item>
        </div>

      </div>
      <div className='flex w-full justify-end'>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm phân loại
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}

export default ThemPhanLoai