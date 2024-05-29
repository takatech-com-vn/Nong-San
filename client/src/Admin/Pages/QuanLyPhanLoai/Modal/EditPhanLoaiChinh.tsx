import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    message
} from "antd";
import { MainCategory } from '../../../../services/MainCategory';
import axios from 'axios';

interface EditPhanLoaiChinhProps {
    mainCategory: MainCategory | null
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    onUpdateSuccess: () => void;
}

function EditPhanLoaiChinh({ mainCategory, setModal, onUpdateSuccess }: EditPhanLoaiChinhProps) {
    const [name, setName] = useState("");

    useEffect(() => {
        if (mainCategory) {
            setName(mainCategory.name);
        }
    }, [mainCategory]);
    console.log('name', mainCategory)

    const handleSubmit = () => {
        const categoryData = {
            name: name,
        };

        axios.put(`${import.meta.env.VITE_APP_API_URL}/product/updatemaincategory/${mainCategory?.id}`, categoryData)
            .then(reponse => {
                message.success("Sửa phân loại thành công", reponse.data.success);
                onUpdateSuccess();
            })
            .catch(() => {
                message.error("Sửa phân loại thất bại");
            })
        setModal(false);
    }

    return (
        <Form className="w-full rounded" onFinish={handleSubmit} layout='vertical'>
            <h2 className="mb-4 text-xl font-bold text-gray-700">Sửa phân loại chính</h2>
            <div>
                <Form.Item label="Tên phân loại chính">
                    <Input style={{ width: '500px' }} placeholder="Nhập tên phân loại chính" onChange={e => setName(e.target.value)} value={name} />
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

export default EditPhanLoaiChinh