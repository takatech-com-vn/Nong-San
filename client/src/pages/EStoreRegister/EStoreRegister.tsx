import React, { useEffect, useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import Content1 from './Contents/Content1';
import Content2 from './Contents/Content2';
import Content3 from './Contents/Content3';
import Content4 from './Contents/Content4';

const steps = [
    {
        title: 'Thông tin chung',
        content: <Content1 />,
    },
    {
        title: 'Thông tin đơn vị',
        content: <Content2 />,

    },
    {
        title: 'Địa điểm kho hàng',
        content: <Content3 />,

    },
    {
        title: 'Xác nhận',
        content: <Content4 />,

    },
];

const EStoreRegister: React.FC = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {
        lineHeight: 'auto',
        // textAlign: 'center',
        color: token.colorTextTertiary,
        // backgroundColor: token.colorFillAlter,
        // borderRadius: token.borderRadiusLG,
        // border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    const [isScrolled, setIsScrolled] = useState(false);
    const checkScroll = () => {
        if (window.pageYOffset > 1) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", checkScroll);
        return () => {
            window.removeEventListener("scroll", checkScroll);
        };
    }, []);
    return (
        <div className={`wrapper h-auto bg-[#fafafb] rounded-[20px] p-[16px] mt-[20px] ${isScrolled ? "pt-[280px] md:pt-[260px]" : "pt-3 md:pt-0"}`}>
            <div className='h-auto mt-[20px] leading-[20px] text-[14px]'>
                <Steps current={current} items={items} className='w-[70%] m-auto' />
                <div style={contentStyle}>{steps[current].content}</div>
                <div style={{ marginTop: 24 }} className='flex items-center justify-end'>
                    {current > 0 && (
                        <Button style={{ right: 0 }} onClick={() => prev()}>
                            Quay lại
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()} >
                            Tiếp tục
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            nộp
                        </Button>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EStoreRegister;