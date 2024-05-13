import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    Upload,
    message
} from "antd";
import axios from 'axios';

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
        <Form className="w-full rounded" onFinish={handleSubmit}>
            <h2 className="mb-4 text-xl font-bold text-gray-700">Sửa tin tức</h2>
            <div>
                <Form.Item label="Tên tin tuc" >
                    <Input style={{ width: '500px' }} placeholder="Nhập tên tin tuc" value={name} onChange={e => setName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Mô tả ngắn" >
                    <TextArea placeholder="Mô tả ngắn" value={shortDescription} onChange={e => setShortDescription(e.target.value)} />
                </Form.Item>

                <Upload
                    listType="picture-card"
                    accept=".png,.jpeg,.jpg"
                    fileList={fileList}
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
            </div>

            <div className="flex mt-4 items-end justify-end">
                <Button type="primary" htmlType="submit">
                    submit
                </Button>
            </div>
        </Form>
    )
}

export default EditNew