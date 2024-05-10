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
        <Form className="w-full rounded" onFinish={handleSubmit}>
            <h2 className="mb-4 text-xl font-bold text-gray-700">Sửa slide</h2>
            <div>
                <Form.Item label="Tên chính sách" >
                    <Input style={{ width: '500px' }} placeholder="Nhập tên chính sách" onChange={e => setName(e.target.value)} value={name} />
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
            </div>
            <div className="flex mt-4 items-end justify-end">
                <Button type="primary" htmlType="submit">
                    submit
                </Button>
            </div>


        </Form>
    )
}

export default EditSlider