import { FloatButton } from 'antd';
import React from 'react';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { LuPhoneCall } from 'react-icons/lu';
import { SiZalo } from 'react-icons/si';
import { RiMessengerLine } from 'react-icons/ri';

const ButtonConnect = () => {
    return (
        <div className="fixed bottom-[15px] right-[15px] group"> 
            <div className="relative flex h-10 w-10 justify-center items-center">
                <span className="animate-ping group-hover:animate-none absolute top-0 right-0 inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> {/* Thay đổi vị trí của span.animate-ping */}
                <FloatButton.Group
                    trigger="hover"
                    type="primary"
                    icon={<CustomerServiceOutlined />}
                    className="right-[15px] bottom-[15px]"
                >
                    <FloatButton icon={<SiZalo />} />
                    <FloatButton icon={<RiMessengerLine />} />
                    <FloatButton icon={<LuPhoneCall />} />
                    <FloatButton icon={<CommentOutlined />} />
                </FloatButton.Group>
            </div>
        </div>
    );
};

export default ButtonConnect;
