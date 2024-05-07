import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
    message
  } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

function ThemChinhSach() {
    const [content, setContent] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = () => {
        const policyData = {
            name: name,
            content: content
        };

        axios.post(`${import.meta.env.VITE_APP_API_URL}/policy/create`, policyData)
        .then(reponse => {
            message.success("Thêm chính sách thành công", reponse.data.success);
        })
        .catch(() => {
            message.error("Thêm chính sách thất bại");
        })
    }



  return (
    <Form className="w-full rounded" onFinish={handleSubmit}>
      <h2 className="mb-4 text-xl font-bold text-gray-700">Thêm chính sách</h2>
      <div>
        <Form.Item label="Tên chính sách" name="name_product">
            <Input style={{width: '500px'}} placeholder="Nhập tên chính sách" onChange={e => setName(e.target.value)}/>
        </Form.Item>

        <h3 style={{fontWeight: "bold", paddingBottom: '10px'}}>Mô tả chính sách</h3>
        <Form.Item name="description">
            <CKEditor
            editor={ ClassicEditor }
            data={content}
            onChange={(event, editor) => {
                const data = editor.getData();
                    setContent(data);
                }}
            />
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm chính sách
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ThemChinhSach