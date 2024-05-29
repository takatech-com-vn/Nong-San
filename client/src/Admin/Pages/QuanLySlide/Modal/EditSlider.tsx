import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    Upload,
    message
} from "antd";
import axios from 'axios';
import { UploadFile } from 'antd/lib/upload/interface';
import { Banner } from '../../../../services/Banner';
import { UploadOutlined } from '@ant-design/icons';

interface EditBannerProps {
    banner: Banner | null;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function EditSlider({ banner, setModal }: EditBannerProps) {
    const [name, setName] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    useEffect(() => {
        if (banner) {
            setName(banner.name);
            setFileList([{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: `${import.meta.env.VITE_APP_API_URL}${banner.path}`
            }]);

        }
    }, [banner]);
    // console.log('name', banner)

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('name', name);

        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append('image', fileList[0].originFileObj);
        }

        const url = banner && banner.type === 'pc' && banner.id
            ? `${import.meta.env.VITE_APP_API_URL}/slide/updateslidepc/${banner.id}`
            : `${import.meta.env.VITE_APP_API_URL}/slide/updateslidemb/${banner && banner.id ? banner.id : ''}`;
        axios.put(url, formData)
            .then(() => {
                message.success(`Cập nhật slide ${banner?.type} thành công`);
            })
            .catch(() => {
                message.error(`Cập nhật slide ${banner?.type} thất bại`);
            })
        setModal(false);
    }


    return (
        <Form className="w-full rounded" onFinish={handleSubmit} layout='vertical'>
            <h2 className="mb-4 text-xl font-bold text-gray-700">Sửa slide</h2>
            <div>
                <Form.Item label="Tên slide" >
                    <Input style={{ width: '500px' }} placeholder="Nhập tên slide" maxLength={50} showCount onChange={e => setName(e.target.value)} value={name} />
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
            <div className="flex mt-4 items-end justify-end">
                <Button type="primary" htmlType="submit">
                    OK
                </Button>
            </div>


        </Form>
    )
}

export default EditSlider