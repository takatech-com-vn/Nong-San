import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    message,
    Select
} from "antd";
import { Manufacturer } from '../../../../services/Manufacturer';
import { ProductCategory } from '../../../../services/ProductCategory';
import axios from 'axios';

interface EditHangSXProps {
    productManufacturer: Manufacturer | null
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    onUpdateSuccess: () => void;
}

function EditHangSX({ productManufacturer, setModal, onUpdateSuccess }: EditHangSXProps) {
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    useEffect(() => {
        if (productManufacturer) {
            setSelectedCategory(productManufacturer.category_id);
        }
    }, [productManufacturer]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_API_URL}/product/getcategory`)
            .then(response => {
                if (response.data.success) {
                    setCategories(response.data.productcategoris);
                } else {
                    console.error('Failed to fetch categories');
                }
            })
            .catch(error => {
                console.error('An error occurred while fetching categories:', error);
            });
    }, []);

    useEffect(() => {
        if (productManufacturer) {
            setName(productManufacturer.name);
        }
    }, [productManufacturer]);
    console.log('name', productManufacturer)

    const handleSubmit = () => {
        const manufacturerData = {
            category_id: selectedCategory,
            name: name,
        };

        axios.put(`${import.meta.env.VITE_APP_API_URL}/product/updatemanufacturer/${productManufacturer?.id}`, manufacturerData)
            .then(reponse => {
                message.success("Sửa phân loại thành công", reponse.data.success);
                onUpdateSuccess(); // Gọi hàm này sau khi cập nhật thành công
            })
            .catch(() => {
                message.error("Sửa phân loại thất bại");
            })
        setModal(false);
    }


    return (
        <Form className="w-full rounded" onFinish={handleSubmit} layout="vertical">
            <h2 className="mb-4 text-xl font-bold text-gray-700">Sửa hãng sản xuất</h2>
            <div className="flex flex-row gap-2">
                <div className="w-full">
                    <Form.Item label="Phân loại">
                        <Select value={selectedCategory} onChange={value => setSelectedCategory(value)}  placeholder='Chọn phân loại'>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name_category}
                                </option>
                            ))}
                        </Select>
                    </Form.Item>

                </div>

                <div className="w-full">
                    <Form.Item label="Hãng sản xuất">
                        <Input placeholder="Nhập tên hãng sản xuất" onChange={e => setName(e.target.value)} value={name} />
                    </Form.Item>
                </div>
            </div>

            <div className="flex mt-4 items-end justify-end">
                <Button type="primary" htmlType="submit">
                    OK
                </Button>
            </div>
        </Form>
    )
}

export default EditHangSX;