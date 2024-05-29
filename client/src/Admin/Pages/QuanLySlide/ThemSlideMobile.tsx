import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
    Upload,
    message
  } from "antd";
import axios from 'axios';
import { UploadFile } from 'antd/lib/upload/interface';
import { UploadOutlined } from '@ant-design/icons';

function ThemSlideMobile() {
    const [name, setName] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleSubmit = () => {
        if (fileList.length > 0 && fileList[0].originFileObj) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', fileList[0].originFileObj);
    
            axios.post(`${import.meta.env.VITE_APP_API_URL}/slide/createslidemobile`, formData)
                .then(() => {
                    message.success('Thêm slide mobile thành công')
                })
                .catch(() => {
                    message.error('Thêm slide mobile thất bại')
                })
        } else {
            console.log('Vui lòng chọn một file');
        }
    }    

  return (
    <Form className="w-full rounded" onFinish={handleSubmit} layout='vertical'>
            <h2 className="mb-4 text-xl font-bold text-gray-700">Thêm Slide Mobie</h2>
            <div>
                <Form.Item label="Tên slide" name="name_product">
                    <Input style={{width: '500px'}} placeholder="Nhập tên slide" maxLength={50} showCount onChange={e => setName(e.target.value)}/>
                </Form.Item>

                <Form.Item label="Hình slide" name="image_slice">
                <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={({ fileList }) => {
                            // Chỉ giữ lại ảnh cuối cùng được chọn
                            if (fileList.length > 1) {
                                fileList.shift();
                            }
                            setFileList(fileList);
                        }}
                        beforeUpload={(file, fileList) => {
                            // Nếu đã có một ảnh được chọn, hủy bỏ tải lên
                            if (fileList.length > 0) {
                                return false;
                            }
                            return true;
                        }}
                        className="w-40 h-40 border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center relative"
                    >
                        {fileList.length >= 1 ? null : (
                            <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                {/* Thêm class 'absolute', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2' */}
                                <UploadOutlined className="text-2xl text-gray-500" />
                                <div className="mt-2 text-gray-700">Chọn ảnh</div>
                                <div className="text-xs text-gray-500">Tối đa 15MB</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
            </div>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Thêm
                </Button>
            </Form.Item>
    </Form>
  )
}

export default ThemSlideMobile