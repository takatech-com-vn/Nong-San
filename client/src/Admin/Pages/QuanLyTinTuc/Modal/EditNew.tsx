import React, { useEffect, useState } from 'react';
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
import { New } from '../../../../services/New';
interface EditNewProps {
    news: New | null;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;

}
function EditNew({ news, setModal }: EditNewProps) {
    const { TextArea } = Input;
    const [content, setContent] = useState("");
    const [name, setName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    useEffect(() => {
        if (news) {
            setName(news.name_new);
            setShortDescription(news.short_description);
            setContent(news.content);
            setFileList([{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: `${import.meta.env.VITE_APP_API_URL}${news.path}`
            }]);

        }
    }, [news]);
    console.log('name', shortDescription)

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('shortDescription', shortDescription);
        formData.append('content', content);

        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append('image', fileList[0].originFileObj);
        }

        if (news) {
            axios.put(`${import.meta.env.VITE_APP_API_URL}/new/updatenew/${news.id}`, formData)
                .then(response => {
                    message.success("Sửa tin tức thành công", response.data.success);
                })
                .catch(() => {
                    message.error("Sửa tin tức thất bại");
                })
        } else {
            console.log('News is null');
        }
        setModal(false);
    }


    return (
        <Form className="w-full rounded" onFinish={handleSubmit} layout='vertical'>
            <h2 className="mb-4 text-xl font-bold text-gray-700">Sửa tin tức</h2>
            <div className='flex gap-10'>
                <div className='flex-1'>
                    <Form.Item label="Tên tin tức" >
                        <Input placeholder="Nhập tên tin tức" maxLength={50} showCount value={name} onChange={e => setName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Mô tả ngắn" >
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

            <div className="flex mt-4 items-end justify-end">
                <Button type="primary" htmlType="submit">
                    OK
                </Button>
            </div>
        </Form>
    )
}

export default EditNew