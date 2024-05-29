import { FloatButton } from 'antd';
import React from 'react';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { LuPhoneCall } from 'react-icons/lu';
import { SiZalo } from 'react-icons/si';
import { RiMessengerLine } from 'react-icons/ri';
const ButtonConnect = () => {
    return (
        <div>
            <FloatButton.Group
                trigger="hover"
                type="primary"
                style={{ right: 15, bottom: 15 }}
                icon={<CustomerServiceOutlined />}
            >
                <FloatButton icon={<SiZalo />} />
                <FloatButton icon={<RiMessengerLine />} />
                <FloatButton icon={<LuPhoneCall />} />
                <FloatButton icon={<CommentOutlined />} />


            </FloatButton.Group>
        </div>
    );
};

export default ButtonConnect;