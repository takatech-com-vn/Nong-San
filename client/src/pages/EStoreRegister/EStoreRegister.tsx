// EStoreRegister.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Button, message, notification, Steps, theme } from 'antd';
import Content1 from './Contents/Content1';
import Content2 from './Contents/Content2';
import Content3 from './Contents/Content3';
import Content4 from './Contents/Content4';
import ValidationContext from './Contents/ValidationContext';
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
    const validationContext = useContext(ValidationContext);
    const next = () => {
        if (validationContext.validate()) {
            setCurrent(current + 1);
        } else {
            // Hiển thị thông báo lỗi nếu dữ liệu không hợp lệ
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const handleSubmit = () => {
        const captchaValid = sessionStorage.getItem('captchaValid');
        if (captchaValid === 'true') {
            // Đối tượng chứa các trường dữ liệu
            const data: { [key: string]: string } = {
                "tenGianHang": "",
                "tenChuGianHang": "",
                "phoneCaNhan": "",
                "emailCaNhan": "",
                "danhMucSanPham": "",
                "loaiGianHang": "",
                "loaiDonVi": "",
                "nguoiDaiDien": "",
                "tenCongTy": "",
                "maSoDoanhNghiep": "",
                "diaChiThuongTru": "",
                "soGiayChungNhanDKKD": "",
                "ngayCapGiayChungNhanDKKD": "",
                "noiCapGiayChungNhanDKKD": "",
                "phoneCongTy": "",
                "maBuuDien": "",
                "selectedCity": "",
                "selectedDistrict": "",
                "selectedWard": "",
                "diaChiCongTy": "",
                "fileChupBanDangKyDoanhNghiep": "",
                "tenNguoiLienHe": "",
                "diaChiKhoHang": "",
                "toaDoKhoHang": "",
                "phoneKhoHang": "",
                "yeuCauDapUng": "",
            };
            Object.keys(data).forEach(key => {
                const value = sessionStorage.getItem(key);
                if (value) {
                    data[key] = value;
                }
            });
            console.log("data đăng ký bán hàng", data);

            message.success('Processing complete!');
        } else {
            notification.error({
                message: 'Vui lòng nhập captcha',
                description: 'Bạn chưa nhập captcha hoặc captcha bạn nhập không đúng. Vui lòng thử lại.',
            });
        }
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {
        lineHeight: 'auto',
        color: token.colorTextTertiary,
        marginTop: 16,
    };

    const [isScrolled, setIsScrolled] = useState(false);
    const checkScroll = () => {
        setIsScrolled(window.pageYOffset > 1);
    };
    useEffect(() => {
        window.addEventListener("scroll", checkScroll);
        return () => {
            window.removeEventListener("scroll", checkScroll);
        };
    }, []);

    return (
        <div className={`wrapper h-auto bg-[#fafafb] rounded-[20px] p-[16px] mt-[20px] ${isScrolled ? "mt-[60px]" : "pt-3 md:pt-0"}`}>
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
                        <Button type="primary" onClick={handleSubmit}>
                            nộp
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EStoreRegister;
