import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
    message
  } from "antd";
import axios from 'axios';

function ThemPhanLoaiChinh() {
    const [name, setName] = useState("");

    const handleSubmit = () => {
        const categoryData = {
            name: name,
        };

        axios.post(`${import.meta.env.VITE_APP_API_URL}/product/maincreatecategory`, categoryData)
        .then(reponse => {
            message.success("Thêm phân loại chính thành công", reponse.data.success);
        })
        .catch(() => {
            message.error("Thêm phân chính loại thất bại");
        })
    }



    return (
        <Form className="w-full rounded" onFinish={handleSubmit}>
        <div>
            <Form.Item label="Tên phân loại" name="name">
                <Input style={{width: '500px'}} placeholder="Nhập tên sản phẩm phân loại chính" onChange={e => setName(e.target.value)}/>
            </Form.Item>
        </div>

        <Form.Item>
            <Button type="primary" htmlType="submit">
            Thêm phân loại chính
            </Button>
        </Form.Item>
        </Form>
    )
}

export default ThemPhanLoaiChinh