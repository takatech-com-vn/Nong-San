import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    Select,
} from "antd";

import { Values } from '../../../services/Values';

interface Props {
  onSubmit: (values: Values) => void;
}

function Product_variations(props: Props) {

  const [form] = Form.useForm();

  // Khai báo state cho từng trường
  const [categoryProduct, setCategoryProduct] = useState('');
  const [quantityProduct, setQuantityProduct] = useState('');
  const [priceProduct, setPriceProduct] = useState('');
  const [priceCoupons, setPriceCoupons] = useState('');
  const [couponsProduct, setCouponsProduct] = useState('');

  const onFinish = (values: Values) => {
    props.onSubmit(values);
  };

  // Sử dụng useEffect để đặt giá trị mặc định khi component được render
  useEffect(() => {
    form.setFieldsValue({
      category_product: categoryProduct,
      quantity_product: quantityProduct,
      price_product: priceProduct,
      price_coupons: priceCoupons,
      coupons_product: couponsProduct,
    });
  }, [categoryProduct, quantityProduct, priceProduct, priceCoupons, couponsProduct]);

  return (
    <Form form={form} onFinish={onFinish} className="w-full rounded " style={{marginTop: '50px', marginBottom: '20px'}}>
      <h2 className="mb-4 text-xl font-bold text-gray-700">Phân loại</h2>
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row  bg-gray-100">
        <div className="w-full sm:w-1/2 md:w-full lg:w-1/3 p-4">
            <Form.Item label="Phân loại" name="category_product">
                <Select placeholder="Phân loại sản phẩm" onChange={setCategoryProduct}/>
            </Form.Item>

            <Form.Item label="Số lượng" name="quantity_product">
                <Input placeholder="Số lượng sản phẩm" onChange={e => setQuantityProduct(e.target.value)}/>
            </Form.Item>
        </div>
        <div className="w-full sm:w-1/2 md:w-full lg:w-1/3 p-4">
            <Form.Item label="Giá bán" name="price_product">
                <Input placeholder="Giá bán" onChange={e => setPriceProduct(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Giá đã giảm" name="price_coupons">
                <Input placeholder="Giá đã giảm" onChange={e => setPriceCoupons(e.target.value)}/>
            </Form.Item>
        </div>
        <div className="w-full sm:w-1/2 md:w-full lg:w-1/3 p-4">

            <Form.Item label="Áp dụng giảm giá" name="coupons_product">
                <Select placeholder="Áp dụng giảm giá sản phẩm" onChange={setCouponsProduct}/>
            </Form.Item>
        </div>
      </div>
    </Form>
  )
}

export default Product_variations
