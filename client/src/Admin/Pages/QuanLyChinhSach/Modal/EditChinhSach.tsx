import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    message
} from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { Policy } from '../../../../services/Policy';

interface EditChinhSachProps {
    policy: Policy | null
    setModal: React.Dispatch<React.SetStateAction<boolean>>;

}
function EditChinhSach({ policy, setModal }: EditChinhSachProps) {
    const [content, setContent] = useState("");
    const [name, setName] = useState("");
    useEffect(() => {
        if (policy) {
            setName(policy.name);
            setContent(policy.content)

        }
    }, [policy]);
    console.log('name', policy)
    
    const handleSubmit = () => {
        const policyData = {
            name: name,
            content: content
        };

        axios.put(`${import.meta.env.VITE_APP_API_URL}/policy/updatepolicy/${policy?.id}`, policyData)
            .then(reponse => {
                message.success("Sửa chính sách thành công", reponse.data.success);
            })
            .catch(() => {
                message.error("Sửa chính sách thất bại");
            })
        setModal(false);
    }



    return (
        <Form className="w-full rounded" onFinish={handleSubmit}>
            <h2 className="mb-4 text-xl font-bold text-gray-700">Sửa chính sách</h2>
            <div>
                <Form.Item label="Tên chính sách">
                    <Input style={{ width: '500px' }} placeholder="Nhập tên chính sách" onChange={e => setName(e.target.value)} value={name} />
                </Form.Item>

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

export default EditChinhSach