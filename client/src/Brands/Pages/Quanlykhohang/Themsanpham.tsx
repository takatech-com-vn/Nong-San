import React, { useState, ReactElement } from 'react';
import axios from 'axios';

import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
} from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Product_variations from './product_variations';
import { Values } from '../../../services/Values';

const Themsanpham = () => {
  const { TextArea } = Input;
  const [description] = useState("");
  const [variations, setVariations] = useState<ReactElement[]>([]);

  const [formData, setFormData] = useState({
    name_product: '',
    line_product: '',
    quantity_product: '',
    ingredient_product: '',
    smell_product: '',
    shortDescription: '',
    secondary_image: '',
    category_product: '',
    pack_product: '',
    weight_product: '',
    wholesale_product: '',
    price_product: '',
    price_coupons: '',
    main_image: '',
    date_product: '',
    expiry_product: '',
    origin_product: '',
    coupons_product: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("form data: " + JSON.stringify(formData));
    axios.post(`${import.meta.env.VITE_APP_API_URL}/product/createproduct`, formData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleFormSubmit = (values: Values) => {
    console.log("values: " + JSON.stringify(values));
  };

  const addVariation = () => {
    setVariations(prevVariations => [
      ...prevVariations, 
      <div key={prevVariations.length} style={{ position: 'relative', display: 'inline-block' }}>
        <Product_variations onSubmit={handleFormSubmit} />
        <button 
          onClick={() => removeVariation(prevVariations.length)}
          style={{
            position: 'absolute',
            right: 0,
            top: 50,
            padding: '10px',
            backgroundColor: '#ff0000', // Màu nền của nút
            color: '#ffffff', // Màu chữ của nút
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          X
        </button>
      </div>
    ]);
  };

  const removeVariation = (index: number) => {
    setVariations(prevVariations => prevVariations.filter((_, i) => i !== index));
  };

  return (
    <Form className="w-full rounded" onFinish={handleSubmit}>
      <h2 className="mb-4 text-xl font-bold text-gray-700">Thêm sản phẩm</h2>
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row  bg-gray-100">
        <div className="w-full sm:w-1/2 md:w-full lg:w-1/3 p-4">
          <Form.Item label="Tên sản phẩm" name="name_product">
            <Input placeholder="Tên sản phẩm" onChange={handleChange}/>
          </Form.Item>

          <Form.Item label="Dòng sản phẩm" name="line_product">
            <Input placeholder="Dòng sản phẩm" onChange={handleChange}/>
          </Form.Item>

          <Form.Item label="Số lượng" name="quantity_product">
            <Input placeholder="Số lượng sản phẩm" onChange={handleChange}/>
          </Form.Item>

          <Form.Item label="Thành phần" name="ingredient_product">
            <Input placeholder="Thành phần" onChange={handleChange}/>
          </Form.Item>

          <Form.Item label="Hương vị" name="smell_product">
            <Input placeholder="Hương vị" onChange={handleChange}/>
          </Form.Item>

          <Form.Item label="Mô tả ngắn" name="shortDescription">
            <TextArea placeholder="Mô tả ngắn"/>
          </Form.Item>

          <Form.Item label="Hình ảnh chính" name="secondary_image">
            <Upload
              listType="picture-card"
              accept=".png,.jpeg,.jpg"
              beforeUpload={(file, fileList) => {
                // Nếu đã có một ảnh được chọn, hủy bỏ tải lên
                if (fileList.length > 1) {
                  return false;
                }
                return true;
              }}
              onChange={({ fileList }) => {
                // Chỉ giữ lại ảnh cuối cùng được chọn
                if (fileList.length > 1) {
                  fileList.shift();
                }
              }}
            >
              <Button>Chọn hình</Button>
            </Upload>
          </Form.Item>
        </div>
        <div className="w-full sm:w-1/2 md:w-full lg:w-1/3 p-4">
          <Form.Item label="Phân loại sản phẩm" name="category_product">
            <Select placeholder="Phân loại" onChange={handleChange}/>
          </Form.Item>

          <Form.Item label="Kiểu đóng gói" name="pack_product">
            <Input placeholder="Kiểu đóng gói" onChange={handleChange}/>
          </Form.Item>

          <Form.Item label="Trọng lượng" name="weight_product">
            <Input placeholder="Trong lượng" onChange={handleChange}/>
          </Form.Item>

          <Form.Item label="Bán sỉ" name="wholesale_product">
            <Input placeholder="Bán sỉ" onChange={handleChange}/>
          </Form.Item>

          <Form.Item label="Giá bán" name="price_product">
            <Input placeholder="Giá bán" onChange={handleChange}/>
          </Form.Item>

          <Form.Item label="Giá đã giảm" name="price_coupons">
            <Input placeholder="Giá đã giảm" onChange={handleChange}/>
          </Form.Item>

          <Form.Item label="Những hình ảnh khác" name="main_image">
            <Upload listType="picture-card" accept=".png,.jpeg,.jpg">
              <Button>Chọn hình</Button>
            </Upload>
          </Form.Item>
        </div>
        <div className="w-full sm:w-1/2 md:w-full lg:w-1/3 p-4">

          <Form.Item label="Ngày sản xuất" name="date_product">
            <DatePicker style={{ height: 40 }} onChange={handleChange}/>
          </Form.Item>

          <Form.Item label="Hạn sử dụng" name="expỉy_product">
            <DatePicker style={{ height: 40 }} onChange={handleChange}/>
          </Form.Item>

          <Form.Item label="Xuất xứ" name="origin_product">
            <Input placeholder="Xuất xứ" onChange={handleChange}/>
          </Form.Item>

          <Form.Item label="Áp dụng giảm giá" name="coupons_product">
            <Select placeholder="Áp dụng giảm giá sản phẩm" onChange={handleChange}/>
          </Form.Item>

        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px'
      }}>
          <h3 onClick={addVariation} style={{
            display: 'inline-block',
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: '#007BFF',
            color: 'white',
            borderRadius: '5px',
            border: 'none',
            fontSize: '15px',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#007BFF'}
          >
            Thêm phân loại sản phẩm
          </h3>
          {variations}
      </div>


      <h2 style={{paddingTop: '20px', paddingBottom: '10px', fontWeight: 'bold'}}>Mô tả sản phẩm</h2>
      <Form.Item name="description">
        <CKEditor
          editor={ ClassicEditor }
          data={description}
          
        />
      </Form.Item>
      {/* <Form.Item label="Trạng thái" name="status">
        <Select>
          <Option value="1">Kích hoạt</Option>
          <Option value="0">Vô hiệu hóa</Option>
        </Select>
      </Form.Item> */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm sản phẩm
        </Button>
      </Form.Item>
    </Form>

  )
}

export default Themsanpham