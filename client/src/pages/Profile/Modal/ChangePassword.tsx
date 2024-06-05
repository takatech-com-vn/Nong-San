import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

interface FormValues {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
interface ChangePasswordProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;

}
function ChangePassword({setModal}:ChangePasswordProps) {
    const [form] = Form.useForm();

    const onFinish = (values: FormValues) => {
        console.log('Mật khẩu mới:', values);
        form.resetFields();
    };

    return (
        <Form
            layout='vertical'
            form={form}
            name="changePassword"
            onFinish={onFinish}
        >

            <Form.Item
                name="currentPassword"
                label="Mật khẩu hiện tại"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
            >
                <Input.Password
                    placeholder="Nhập mật khẩu hiện tại"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>

            <Form.Item
                name="newPassword"
                label="Mật khẩu mới"
                rules={[
                    { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                    { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' },
                ]}
                hasFeedback
            >
                <Input.Password
                    placeholder="Nhập mật khẩu mới"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>

            <Form.Item
                name="confirmNewPassword"
                label="Nhập lại mật khẩu mới"
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                    { required: true, message: 'Vui lòng nhập lại mật khẩu mới!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu không khớp!'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    placeholder="Nhập lại mật khẩu mới"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>

            <div className="flex justify-center w-full gap-3">
                <Button type="default" htmlType="button" className="mr-2" onClick={()=> setModal(false)}>
                    Hủy
                </Button>
                <Button type="primary" htmlType="submit">
                    Lưu thay đổi
                </Button>
            </div>
        </Form>
    );
}

export default ChangePassword;