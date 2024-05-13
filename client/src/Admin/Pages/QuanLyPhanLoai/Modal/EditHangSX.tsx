import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    message
} from "antd";
import { Manufacturer } from '../../../../services/Manufacturer';
import axios from 'axios';

interface EditHangSXProps {
    productManufacturer: Manufacturer | null
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditHangSX({ productManufacturer, setModal }: EditHangSXProps) {
    const [name, setName] = useState("");

    useEffect(() => {
        if (productManufacturer) {
            setName(productManufacturer.name);
        }
    }, [productManufacturer]);
    console.log('name', productManufacturer)

    const handleSubmit = () => {
        const manufacturerData = {
            name: name,
        };

        axios.put(`${import.meta.env.VITE_APP_API_URL}/product/updatemanufacturer/${productManufacturer?.id}`, manufacturerData)
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
            <h2 className="mb-4 text-xl font-bold text-gray-700">Sửa hãng sản xuất</h2>
            <div>
                <Form.Item label="Tên phân loại">
                    <Input style={{ width: '500px' }} placeholder="Nhập tên hãng sản xuất" onChange={e => setName(e.target.value)} value={name} />
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

export default EditHangSX;