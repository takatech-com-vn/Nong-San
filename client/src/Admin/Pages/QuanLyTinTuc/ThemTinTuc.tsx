import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
    Upload
  } from "antd";
import axios from 'axios';

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { UploadFile } from 'antd/lib/upload/interface';

function ThemTinTuc() {
    const { TextArea } = Input;
    const [content, setContent] = useState("");
    const [name, setName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleSubmit = () => {
        if (fileList.length > 0 && fileList[0].originFileObj) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('shortDescription', shortDescription);
            formData.append('content', content);
            formData.append('image', fileList[0].originFileObj);
    
            axios.post(`${import.meta.env.VITE_APP_API_URL}/new/createnew`, formData)
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
            <h2 className="mb-4 text-xl font-bold text-gray-700">Thêm tin tức</h2>
            <div>
                <Form.Item label="Tên tin tuc" name="name_new">
                    <Input style={{width: '500px'}} placeholder="Nhập tên tin tuc" value={name} onChange={e => setName(e.target.value)}/>
                </Form.Item>

                <Form.Item label="Mô tả ngắn" name="shortDescription">
                    <TextArea placeholder="Mô tả ngắn" value={shortDescription} onChange={e => setShortDescription(e.target.value)}/>
                </Form.Item>

                <Form.Item label="Hình tin tức" name="image_slice">
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
                    Thêm tin tức
                </Button>
            </Form.Item>
    </Form>
  )
}

export default ThemTinTuc