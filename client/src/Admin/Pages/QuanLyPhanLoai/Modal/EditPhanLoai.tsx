import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    message
} from "antd";
import { ProductCategory } from '../../../../services/ProductCategory';
import axios from 'axios';

interface EditPhanLoaiProps {
    productCategory: ProductCategory | null
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditPhanLoai({ productCategory, setModal }: EditPhanLoaiProps) {
    const [name, setName] = useState("");

    useEffect(() => {
        if (productCategory) {
            setName(productCategory.name_category);
        }
    }, [productCategory]);
    console.log('name', productCategory)

    const handleSubmit = () => {
        const categoryData = {
            name: name,
        };

        axios.put(`${import.meta.env.VITE_APP_API_URL}/product/updatecategory/${productCategory?.id}`, categoryData)
            .then(reponse => {
                message.success("Sửa phân loại thành công", reponse.data.success);
            })
            .catch(() => {
                message.error("Sửa phân loại thất bại");
            })
        setModal(false);
    }

    return (
        <Form className="w-full rounded" onFinish={handleSubmit}>
            <h2 className="mb-4 text-xl font-bold text-gray-700">Sửa phân loại</h2>
            <div>
                <Form.Item label="Tên phân loại">
                    <Input style={{ width: '500px' }} placeholder="Nhập tên phân loại" onChange={e => setName(e.target.value)} value={name} />
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

export default EditPhanLoai