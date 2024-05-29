import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
    Upload,
    message
} from "antd";
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
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
                    message.success("Thêm tin tức thành công", response.data.success);
                })
                .catch(() => {
                    message.error("Thêm tin tức thất bại");
                })
        } else {
            console.log('Vui lòng chọn một file');
        }
    }

    return (
        <Form className="w-full rounded" onFinish={handleSubmit} layout='vertical'>
            <h2 className="mb-4 text-xl font-bold text-gray-700">Thêm tin tức</h2>
            <div className='flex gap-10'>
                <div className='flex-1'>
                    <Form.Item label="Tên tin tức" name="name_new">
                        <Input placeholder="Nhập tên tin tức" maxLength={50} showCount value={name} onChange={e => setName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Mô tả ngắn" name="shortDescription">
                        <TextArea placeholder="Mô tả ngắn" value={shortDescription} onChange={e => setShortDescription(e.target.value)} />
                    </Form.Item>
                </div>

                <div className='flex-1'>
                    <Form.Item label="Hình tin tức" name="image_slice">
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
            </div>
            <h3 style={{ fontWeight: "bold", paddingBottom: '10px' }}>Mô tả chính sách</h3>
            <Form.Item name="description">
                <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data);
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Thêm tin tức
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ThemTinTuc