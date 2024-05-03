// Content2.tsx

import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { Cascader } from 'antd';
import type { MultipleCascaderProps, } from 'antd/es/cascader';
import { InboxOutlined } from '@ant-design/icons';
// import type { UploadFile, } from 'antd';
import { Upload } from 'antd';
import { AiTwotoneDelete } from 'react-icons/ai';
import axios from 'axios';
// const { SHOW_CHILD } = Cascader;
interface City {
    Id: string;
    Name: string;
    Districts: District[];
}

interface District {
    Id: string;
    Name: string;
    Wards: Ward[];
}

interface Ward {
    Id: string;
    Name: string;
    Level: string;
}


interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}
const options: Option[] = [
    {
        label: 'Nông sản đặc trưng tỉnh Đắk Lắk',
        value: 'Nông sản đặc trưng tỉnh Đắk Lắk',
    },
    {
        label: 'Sản phẩm',
        value: 'Sản phẩm',
        children: [
            { value: 'Sầu riêng', label: 'Sầu riêng' },
            { value: 'Bơ', label: 'Bơ' },
            { value: 'Tiêu', label: 'Tiêu' },
            { value: 'Rau củ', label: 'Rau củ' },
            { value: 'Cacao', label: 'Cacao' },
            { value: 'Hạt ngũ cốc', label: 'Hạt ngũ cốc' },
            { value: 'Phân hữu cơ', label: 'Phân hữu cơ' },
            { value: 'Phân bón', label: 'Phân bón' },
            { value: 'Khác', label: 'Khác' },
            { value: 'Macca', label: 'Macca' },
            { value: 'Mít thái', label: 'Mít thái' },
        ],
    },
];
const option2: Option[] = [
    {
        label: 'Buôn đôn',
        value: 'Buôn đôn',
    },
    {
        label: 'Buôn ma thuột',
        value: 'Buôn ma thột',
    },
    {
        label: 'Buôn các loại hạt',
        value: 'Buôn các loại hạt',
    },

];
// const onChange2 = (value: string) => {
//     console.log(`selected ${value}`);
// };

const onSearch = (value: string) => {
    console.log('search:', value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const { Dragger } = Upload;
const Content2: React.FC = () => {
    const [danhMucSanPham, setDanhMucSanPham] = useState<string[]>([]);
    const [loaiGianHang, setLoaiGianHang] = useState<string[]>([])
    const [loaiDonVi, setLoaiDonVi] = useState('');
    const [nguoiDaiDien, setNguoiDaiDien] = useState('');
    const [tenCongTy, setTenCongTy] = useState('');
    const [maSoDoanhNghiep, setMaSoDoanhNghiep] = useState('');
    const [diaChiThuongTru, setDiaChiThuongTru] = useState('');
    const [soGiayChungNhanDKKD, setSoGiayChungNhanDKKD] = useState('');
    const [ngayCapGiayChungNhanDKKD, setNgayCapGiayChungNhanDKKD] = useState('');
    const [noiCapGiayChungNhanDKKD, setNoiCapGiayChungNhanDKKD] = useState('');
    const [phoneCongTy, setPhoneCongTy] = useState('');
    const [maBuuDien, setMaBuuDien] = useState('');
    const [diaChiCongTy, setDiaChiCongTy] = useState('');
    const [fileChupBanDangKyDoanhNghiep, setFileChupBanDangKyDoanhNghiep] = useState<string | null>(null);
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");
    const [selectedWard, setSelectedWard] = useState<string>("");
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get<City[]>(
                "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
            );
            setCities(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const handleCityChange = (value: string) => {
        setSelectedCity(value);
        sessionStorage.setItem('selectedCity', JSON.stringify(value));
        setSelectedDistrict(""); // Đặt lại quận/huyện khi chọn tỉnh/thành phố mới
        setSelectedWard(""); // Đặt lại phường/xã khi chọn tỉnh/thành phố mới
    };

    const handleDistrictChange = (value: string) => {
        setSelectedDistrict(value);
        sessionStorage.setItem('selectedDistrict', JSON.stringify(value));
        setSelectedWard(""); // Đặt lại phường/xã khi chọn quận/huyện mới
    };


    const handleWardChange = (value: string) => {
        setSelectedWard(value);
        sessionStorage.setItem('selectedWard', JSON.stringify(value));
    };

    // const [fileList, setFileList] = useState<UploadFile[]>([]);
    useEffect(() => {
        // Khôi phục hình ảnh từ sessionStorage khi component được render
        const storedImageData = sessionStorage.getItem('fileChupBanDangKyDoanhNghiep');
        if (storedImageData) setFileChupBanDangKyDoanhNghiep(storedImageData);
    }, []);

    const handleBeforeUpload = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Chuyển đổi hình ảnh thành base64 và lưu vào state
            const base64Data = reader.result as string;
            setFileChupBanDangKyDoanhNghiep(base64Data);
            // Lưu base64 vào sessionStorage
            sessionStorage.setItem('fileChupBanDangKyDoanhNghiep', base64Data);
        };
        return false; // Hủy quá trình tải lên mặc định của Upload
    };
    const handleRemove = () => {
        // Xóa hình ảnh khỏi state và sessionStorage khi người dùng loại bỏ nó
        setFileChupBanDangKyDoanhNghiep(null);
        sessionStorage.removeItem('fileChupBanDangKyDoanhNghiep');
    };

    useEffect(() => {
        const storedDanhMucSanPham = sessionStorage.getItem('danhMucSanPham');
        const storedLoaiGianHang = sessionStorage.getItem('loaiGianHang');
        const storedLoaiDonVi = sessionStorage.getItem('loaiDonVi');
        const storedNguoiDaiDien = sessionStorage.getItem('nguoiDaiDien');
        const storedTenCongTy = sessionStorage.getItem('tenCongTy');
        const storedMaSoDoanhNghiep = sessionStorage.getItem('maSoDoanhNghiep');
        const storedDiaChiThuongTru = sessionStorage.getItem('diaChiThuongTru');
        const storedSoGiayChungNhanDKKD = sessionStorage.getItem('soGiayChungNhanDKKD');
        const storedNgayCapGiayChungNhanDKKD = sessionStorage.getItem('ngayCapGiayChungNhanDKKD');
        const storedNoiCapGiayChungNhanDKKD = sessionStorage.getItem('noiCapGiayChungNhanDKKD');
        const storedphoneCongTy = sessionStorage.getItem('phoneCongTy');
        const storedMaBuuDien = sessionStorage.getItem('maBuuDien');
        const storedTinhThanh = sessionStorage.getItem('selectedCity');
        const storedQuanHuyen = sessionStorage.getItem('selectedDistrict');
        const storedPhuongXa = sessionStorage.getItem('selectedWard');
        const storedDiaChiCongTy = sessionStorage.getItem('diaChiCongTy');
        const storedFileChupBanDangKyDoanhNghiep = sessionStorage.getItem('fileChupBanDangKyDoanhNghiep');

        if (storedDanhMucSanPham) { setDanhMucSanPham(JSON.parse(storedDanhMucSanPham)); }
        if (storedLoaiGianHang) { setLoaiGianHang(JSON.parse(storedLoaiGianHang)); }
        if (storedLoaiDonVi) { setLoaiDonVi(storedLoaiDonVi); }
        if (storedNguoiDaiDien) { setNguoiDaiDien(storedNguoiDaiDien); }
        if (storedTenCongTy) { setTenCongTy(storedTenCongTy); }
        if (storedMaSoDoanhNghiep) { setMaSoDoanhNghiep(storedMaSoDoanhNghiep); }
        if (storedDiaChiThuongTru) { setDiaChiThuongTru(storedDiaChiThuongTru); }
        if (storedSoGiayChungNhanDKKD) { setSoGiayChungNhanDKKD(storedSoGiayChungNhanDKKD); }
        if (storedNgayCapGiayChungNhanDKKD) { setNgayCapGiayChungNhanDKKD(storedNgayCapGiayChungNhanDKKD); }
        if (storedNoiCapGiayChungNhanDKKD) { setNoiCapGiayChungNhanDKKD(storedNoiCapGiayChungNhanDKKD); }
        if (storedphoneCongTy) { setPhoneCongTy(storedphoneCongTy); }
        if (storedMaBuuDien) { setMaBuuDien(storedMaBuuDien); }
        if (storedTinhThanh) { setSelectedCity(storedTinhThanh); }
        if (storedQuanHuyen) { setSelectedDistrict(storedQuanHuyen); }
        if (storedPhuongXa) { setSelectedWard(storedPhuongXa); }
        if (storedDiaChiCongTy) { setDiaChiCongTy(storedDiaChiCongTy); }
        if (storedFileChupBanDangKyDoanhNghiep) { setFileChupBanDangKyDoanhNghiep(storedFileChupBanDangKyDoanhNghiep); }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('nguoiDaiDien', nguoiDaiDien);
        sessionStorage.setItem('tenCongTy', tenCongTy);
        sessionStorage.setItem('maSoDoanhNghiep', maSoDoanhNghiep);
        sessionStorage.setItem('diaChiThuongTru', diaChiThuongTru);
        sessionStorage.setItem('soGiayChungNhanDKKD', soGiayChungNhanDKKD);
        sessionStorage.setItem('ngayCapGiayChungNhanDKKD', ngayCapGiayChungNhanDKKD);
        sessionStorage.setItem('noiCapGiayChungNhanDKKD', noiCapGiayChungNhanDKKD);
        sessionStorage.setItem('phoneCongTy', phoneCongTy);
        sessionStorage.setItem('maBuuDien', maBuuDien);
        sessionStorage.setItem('diaChiCongTy', diaChiCongTy);


    }, [nguoiDaiDien, tenCongTy, maSoDoanhNghiep, diaChiThuongTru, soGiayChungNhanDKKD, ngayCapGiayChungNhanDKKD, noiCapGiayChungNhanDKKD, phoneCongTy, maBuuDien, diaChiCongTy]);

    // Hàm xử lý sự kiện khi có sự thay đổi trong Cascader
    const onChangeDanhMuc: MultipleCascaderProps<Option>['onChange'] = (value) => {
        // Ép kiểu giá trị nhận được về mảng chuỗi và lưu vào state
        const selectedValues = value as unknown as string[];
        setDanhMucSanPham(selectedValues);
        // Lưu giá trị vào sessionStorage
        sessionStorage.setItem('danhMucSanPham', JSON.stringify(selectedValues));
    };

    const onChangeLoaiGianHang: MultipleCascaderProps<Option>['onChange'] = (value) => {
        // Ép kiểu giá trị nhận được về mảng chuỗi và lưu vào state
        const selectedValues = value as unknown as string[];
        setLoaiGianHang(selectedValues);
        sessionStorage.setItem('loaiGianHang', JSON.stringify(selectedValues));
    };

    const onChangeLoaiDonVi = (value: string) => {
        setLoaiDonVi(value);
        sessionStorage.setItem('loaiDonVi', value);
    };

    return (
        <div className='h-auto flex flex-col mt-[40px]'>
            <span className='text-[20px] text-black font-medium mb-4'>Đại diện thương hiệu</span>
            <div className='grid grid-cols-1 sm:grid-cols-2 5 gap-4'>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700 " htmlFor="danhMucSanPham">
                            Hãy cho chúng tôi biết phần lớn sản phẩm của bạn thuộc các danh mục nào <span className='text-red-600'>*</span>
                        </label>

                        <Cascader
                            className='mt-1 h-[36px]'
                            style={{ width: '100%' }}
                            options={options}
                            onChange={onChangeDanhMuc}
                            value={danhMucSanPham}
                            multiple
                            maxTagCount="responsive"
                            placeholder="Chọn danh mục"
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="loaiGianHang">
                            Loại gian hàng
                        </label>
                        <Cascader
                            className='mt-1 h-[36px]'
                            style={{ width: '100%' }}
                            options={option2}
                            onChange={onChangeLoaiGianHang}
                            value={loaiGianHang}
                            multiple
                            maxTagCount="responsive"
                            placeholder="Chọn"

                        />
                    </div>
                </div>
            </div>
            <span className='text-[20px] text-black font-medium mb-4 mt-[40px]'>Thông tin đơn vị</span>
            <div className='grid grid-cols-1 sm:grid-cols-2 5 gap-4'>

                <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="loaiDonVi">
                        Loại đơn vị
                    </label>

                    <Select
                        className='mt-1 h-[36px]'
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Chọn"
                        optionFilterProp="children"
                        onChange={onChangeLoaiDonVi}
                        onSearch={onSearch}
                        value={loaiDonVi}
                        filterOption={filterOption}
                        options={[
                            {
                                value: 'Công ty trách nhiệm hữu hạn',
                                label: 'Công ty trách nhiệm hữu hạn',
                            },
                            {
                                value: 'Hộ kinh doanh',
                                label: 'Hộ kinh doanh',
                            },
                            {
                                value: 'Doanh nghiệp tư nhân',
                                label: 'Doanh nghiệp tư nhân',
                            },
                            {
                                value: 'Công ty hợp danh',
                                label: 'Công ty hợp danh',
                            },
                            {
                                value: 'Công ty cổ phần',
                                label: 'Công ty cổ phần',
                            },
                            {
                                value: 'Hợp tác xã',
                                label: 'Hợp tác xã',
                            },
                            {
                                value: 'Hộ nông dân',
                                label: 'Hộ nông dân',
                            },
                            {
                                value: 'Tổ hợp tác',
                                label: 'Tổ hợp tác',
                            },
                            {
                                value: 'Chi hội nghề nghiệp',
                                label: 'Chi hội nghề nghiệp',
                            },
                        ]}
                    />
                </div>
                <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="nguoiDaiDien">
                        Người đại diện theo pháp luật
                    </label>
                    <input
                        className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 border `}
                        type="text"
                        id="nguoiDaiDien"
                        value={nguoiDaiDien}
                        onChange={(e) => setNguoiDaiDien(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="tenCongTy">
                        Tên công ty
                    </label>
                    <input
                        className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 border `}
                        type="text"
                        id="tenCongTy"
                        value={tenCongTy}
                        onChange={(e) => setTenCongTy(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="maSoDoanhNghiep">
                        Mã số doanh nghiệp
                    </label>
                    <input
                        className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 border `}
                        type="text"
                        id="maSoDoanhNghiep"
                        value={maSoDoanhNghiep}
                        onChange={(e) => setMaSoDoanhNghiep(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="diaChiThuongTru">
                        Địa chỉ thường trú của chủ doanh nghiệp
                    </label>
                    <input
                        className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 border `}
                        type="text"
                        id="diaChiThuongTru"
                        value={diaChiThuongTru}
                        onChange={(e) => setDiaChiThuongTru(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="soGiayChungNhanDKKD">
                        Số giấy chứng nhận đăng ký kinh doanh
                    </label>
                    <input
                        className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 border `}
                        type="text"
                        id="soGiayChungNhanDKKD"
                        value={soGiayChungNhanDKKD}
                        onChange={(e) => setSoGiayChungNhanDKKD(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="ngayCapGiayChungNhanDKKD">
                        Ngày cấp giấy chứng nhận đăng ký kinh doanh
                    </label>
                    <input
                        className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 border `}
                        type="text"
                        id="ngayCapGiayChungNhanDKKD"
                        value={ngayCapGiayChungNhanDKKD}
                        onChange={(e) => setNgayCapGiayChungNhanDKKD(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="noiCapGiayChungNhanDKKD">
                        Nơi cấp giấy chứng nhận đăng ký kinh doanh
                    </label>
                    <input
                        className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 border `}
                        type="text"
                        id="noiCapGiayChungNhanDKKD"
                        value={noiCapGiayChungNhanDKKD}
                        onChange={(e) => setNoiCapGiayChungNhanDKKD(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="phoneCongTy">
                        Số điện thoại
                    </label>
                    <input
                        className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 border `}
                        type="text"
                        id="phoneCongTy"
                        value={phoneCongTy}
                        onChange={(e) => setPhoneCongTy(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="maBuuDien">
                        Mã bưu điện
                    </label>
                    <input
                        className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 border `}
                        type="text"
                        id="maBuuDien"
                        value={maBuuDien}
                        onChange={(e) => setMaBuuDien(e.target.value)}
                    />
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'>
                <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="selectedCity">
                        Tỉnh thành
                    </label>
                    <Form.Item label="Tỉnh/Thành phố">
                        <Select onChange={handleCityChange} value={selectedCity}>
                            {cities.map((city) => (
                                <Select.Option key={city.Id} value={city.Name}>
                                    {city.Name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="selectedDistrict">
                        Quận huyện
                    </label>
                    <Form.Item label="Quận/Huyện">
                        <Select onChange={handleDistrictChange} value={selectedDistrict}>
                            {cities
                                .find((city) => city.Name === selectedCity)
                                ?.Districts.map((district) => (
                                    <Select.Option key={district.Id} value={district.Name}>
                                        {district.Name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                </div>
                <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="selectedWard">
                        Phường xã
                    </label>
                    <Form.Item label="Phường/Xã">
                        <Select onChange={handleWardChange} value={selectedWard}>
                            {cities
                                .find((city) => city.Name === selectedCity)
                                ?.Districts.find((district) => district.Name === selectedDistrict)
                                ?.Wards.map((ward) => (
                                    <Select.Option key={ward.Id} value={ward.Name}>
                                        {ward.Name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
                <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="diaChiCongTy">
                        Địa chỉ
                    </label>
                    <input
                        className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 border `}
                        type="text"
                        id="diaChiCongTy"
                        value={diaChiCongTy}
                        onChange={(e) => setDiaChiCongTy(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="fileChupBanDangKyDoanhNghiep">
                        File chụp bản đăng ký doanh nghiệp
                    </label>
                    <Dragger
                        accept=".png,.jpg,.jpeg"
                        beforeUpload={handleBeforeUpload}
                        fileList={[]}
                        onRemove={handleRemove}
                        showUploadList={{
                            showRemoveIcon: true,
                        }}
                    >
                        {fileChupBanDangKyDoanhNghiep ? (
                            <div className='relative group'>
                                <img src={fileChupBanDangKyDoanhNghiep} alt="Uploaded" className='w-full h-auto group-hover:opacity-50' />
                                <button onClick={handleRemove} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  opacity-0 group-hover:!opacity-100'>
                                    <AiTwotoneDelete className='text-red-600 text-[30px]' />
                                </button>
                            </div>

                        ) : (
                            <>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            </>
                        )}
                    </Dragger>
                </div>
            </div>
        </div>
    );
};

export default Content2;
