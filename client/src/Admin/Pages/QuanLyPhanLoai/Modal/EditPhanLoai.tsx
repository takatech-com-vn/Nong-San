import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    message,
    Select
} from "antd";
import { ProductCategory } from '../../../../services/ProductCategory';
import axios from 'axios';
import { MainCategory } from '../../../../services/MainCategory';

interface EditPhanLoaiProps {
    productCategory: ProductCategory | null
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    onUpdateSuccess: () => void;
}

function EditPhanLoai({ productCategory, setModal, onUpdateSuccess }: EditPhanLoaiProps) {
    const [maincategories, setMainCategories] = useState<MainCategory[]>([]);
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    useEffect(() => {
        if (productCategory) {
            setSelectedCategory(productCategory.maincategory_id);
        }
    }, [productCategory]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_API_URL}/product/getmaincategory`)
          .then(response => {
            if (response.data.success) {
              setMainCategories(response.data.maincategoris);
            } else {
              console.error('Failed to fetch categories');
            }
          })
          .catch(error => {
            console.error('An error occurred while fetching categories:', error);
          });
      }, []);

    useEffect(() => {
        if (productCategory) {
            setName(productCategory.name_category);
        }
    }, [productCategory]);
    console.log('name', productCategory)

    const handleSubmit = () => {
        const categoryData = {
            maincategory_id: selectedCategory,
            name: name,
        };

        axios.put(`${import.meta.env.VITE_APP_API_URL}/product/updatecategory/${productCategory?.id}`, categoryData)
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
        <Form className="w-full rounded" onFinish={handleSubmit}>
            <h2 className="mb-4 text-xl font-bold text-gray-700">Sửa phân loại</h2>

            <div className="flex space-x-4">
                <div className="flex-1">
                    <Select value={selectedCategory} onChange={value => setSelectedCategory(value)}>
                        {maincategories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Select>
                </div>

                <div>
                    <Form.Item label="Tên phân loại">
                        <Input style={{ width: '500px' }} placeholder="Nhập tên phân loại" onChange={e => setName(e.target.value)} value={name} />
                    </Form.Item>
                </div>
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