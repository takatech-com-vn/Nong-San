// EStoreRegister.tsx
import React, { useContext, useState } from 'react';
import { Button, message, notification, Steps, theme,  } from 'antd';
import Content1 from './Contents/Content1';
import Content2 from './Contents/Content2';
import Content3 from './Contents/Content3';
import Content4 from './Contents/Content4';
import ValidationContext from './Contents/ValidationContext';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
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
    const user = useSelector((state: RootState) => state.user.user);
    const next = () => {
        if (validationContext.validate()) {
            setCurrent(current + 1);
        } else {
            // Hiển thị thông báo lỗi nếu dữ liệu không hợp l
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const handleSubmit = async () => {
        const captchaValid = sessionStorage.getItem('captchaValid');
        if (captchaValid === 'true') {
            const data = {
                "user": user?.id ? user.id.toString() : "",
                "tenGianHang": sessionStorage.getItem("tenGianHang") || "",
                "tenChuGianHang": sessionStorage.getItem("tenChuGianHang") || "",
                "phoneCaNhan": sessionStorage.getItem("phoneCaNhan") || "",
                "emailCaNhan": sessionStorage.getItem("emailCaNhan") || "",
                "danhMucSanPham": sessionStorage.getItem("danhMucSanPham") || "",
                "loaiGianHang": sessionStorage.getItem("loaiGianHang") || "",
                "loaiDonVi": sessionStorage.getItem("loaiDonVi") || "",
                "nguoiDaiDien": sessionStorage.getItem("nguoiDaiDien") || "",
                "tenCongTy": sessionStorage.getItem("tenCongTy") || "",
                "maSoDoanhNghiep": sessionStorage.getItem("maSoDoanhNghiep") || "",
                "diaChiThuongTru": sessionStorage.getItem("diaChiThuongTru") || "",
                "soGiayChungNhanDKKD": sessionStorage.getItem("soGiayChungNhanDKKD") || "",
                "ngayCapGiayChungNhanDKKD": sessionStorage.getItem("ngayCapGiayChungNhanDKKD") || "",
                "noiCapGiayChungNhanDKKD": sessionStorage.getItem("noiCapGiayChungNhanDKKD") || "",
                "phoneCongTy": sessionStorage.getItem("phoneCongTy") || "",
                "maBuuDien": sessionStorage.getItem("maBuuDien") || "",
                "selectedCity": sessionStorage.getItem("selectedCity") || "",
                "selectedDistrict": sessionStorage.getItem("selectedDistrict") || "",
                "selectedWard": sessionStorage.getItem("selectedWard") || "",
                "diaChiCongTy": sessionStorage.getItem("diaChiCongTy") || "",
                "tenNguoiLienHe": sessionStorage.getItem("tenNguoiLienHe") || "",
                "diaChiKhoHang": sessionStorage.getItem("diaChiKhoHang") || "",
                "toaDoKhoHang": sessionStorage.getItem("toaDoKhoHang") || "",
                "phoneKhoHang": sessionStorage.getItem("phoneKhoHang") || "",
                "yeuCauDapUng": sessionStorage.getItem("yeuCauDapUng") || ""
            };
    
            const formData = new FormData();
    
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
    
            const imageDataString = sessionStorage.getItem('image');
            let imageFile = null;
    
            if (imageDataString) {
                try {
                    const fileList = JSON.parse(imageDataString);
                    if (fileList.length > 0) {
                        const fileData = fileList[0];
                        if (fileData.originFileObj) {
                            imageFile = new File(
                                [fileData.originFileObj],
                                fileData.name,
                                { type: fileData.type }
                            );
                        } else {
                            console.error("Không tìm thấy tệp hình ảnh hợp lệ trong danh sách");
                        }
                    } else {
                        console.error("Không tìm thấy hình ảnh hợp lệ trong danh sách");
                    }
                } catch (error) {
                    console.error("Lỗi khi parse dữ liệu hình ảnh:", error);
                }
            } else {
                console.error("Không tìm thấy dữ liệu hình ảnh trong sessionStorage");
            }
    
            if (imageFile) {
                formData.append('image', imageFile);
            } else {
                console.error("Không tìm thấy tệp hình ảnh để gửi đi");
            }
    
            formData.forEach((value, key) => {
                console.log(key, value);
            });
    
            axios.post(`${import.meta.env.VITE_APP_API_URL}/brand/createbrand`, formData)
            .then(response => {
                message.success("Thêm brand thành công", response.data.success);
            })
            .catch(() => {
                message.error("Thêm brand thất bại");
            })
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


    return (
        <div className={`wrapper h-auto bg-[#fafafb] rounded-[20px] p-[16px] mt-[65px]`}>
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
