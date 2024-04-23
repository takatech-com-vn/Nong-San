import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
    Upload
  } from "antd";
import axios from 'axios';
import { UploadFile } from 'antd/lib/upload/interface';

function ThemSlidePC() {
    const [name, setName] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleSubmit = () => {
        if (fileList.length > 0 && fileList[0].originFileObj) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', fileList[0].originFileObj);
    
            axios.post(`${import.meta.env.VITE_APP_API_URL}/slide/createslide`, formData)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            console.log('Vui lòng chọn một file');
        }
    }    

  return (
    <Form className="w-full rounded" onFinish={handleSubmit}>
            <h2 className="mb-4 text-xl font-bold text-gray-700">Thêm sản phẩm</h2>
            <div>
                <Form.Item label="Tên chính sách" name="name_product">
                    <Input style={{width: '500px'}} placeholder="Nhập tên chính sách" onChange={e => setName(e.target.value)}/>
                </Form.Item>

                <Form.Item label="Slide" name="image_slice">
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
                            setFileList(fileList);
                        }}
                    >
                        <Button>Chọn hình</Button>
                    </Upload>
                </Form.Item>
            </div>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Thêm slide pc
                </Button>
            </Form.Item>
    </Form>
  )
}

export default ThemSlidePC