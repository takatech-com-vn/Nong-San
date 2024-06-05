// Content2.tsx
import React, { useEffect, useState } from 'react';
import { Form, GetProp, Select, UploadFile, UploadProps } from 'antd';
import { Cascader } from 'antd';
import type { MultipleCascaderProps, } from 'antd/es/cascader';

import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
import { Image, Upload } from 'antd';
import axios from 'axios';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

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



const onSearch = (value: string) => {
    console.log('search:', value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });


const Content2: React.FC = () => {
    const [danhMucSanPham, setDanhMucSanPham] = useState<(string | number)[]>([]);
    const [loaiGianHang, setLoaiGianHang] = useState<string[]>([]);
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


    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/product/getcategory`);
            if (response.data.success) {
                return response.data.productcategoris;
            } else {
                throw new Error('Failed to fetch categories');
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformCategories = (categories: any[]): Option[] => {
        const mainCategories: { [key: string]: Option } = {};

        categories.forEach(category => {
            if (!mainCategories[category.name]) {
                mainCategories[category.name] = {
                    label: category.name,
                    value: category.name,
                    children: [],
                };
            }
            mainCategories[category.name].children!.push({
                label: category.name_category,
                value: category.name_category,
            });
        });

        return Object.values(mainCategories);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformLoaiGianHang = (categories: any[]): JSX.Element[] => {
        return categories.map(category => (
            <Option key={category.id} value={category.name_category}>
                {category.name_category}
            </Option>
        ));
    };
    

    const [options, setOptions] = useState<Option[]>([]);
    const [optionLoaiGianHang, setOptionLoaiGianHang] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            const categories = await fetchCategories();
            const transformedOptions = transformCategories(categories);
            setOptions(transformedOptions);
        };
        getCategories();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const categories = await fetchCategories();
            const transformedCategories = transformLoaiGianHang(categories);
            setOptionLoaiGianHang(transformedCategories);
        };
        getCategories();
    }, []);

    const onChangeDanhMuc: MultipleCascaderProps<Option>['onChange'] = (value) => {
        const selectedValues = value as unknown as (string | number)[];
        setDanhMucSanPham(selectedValues);
        sessionStorage.setItem('danhMucSanPham', JSON.stringify(selectedValues));
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

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    useEffect(() => {
        const storedImageData = sessionStorage.getItem('image');
        if (storedImageData) {
            setFileList(JSON.parse(storedImageData));
            console.log('log img', fileList)
        }
    }, []);

    useEffect(() => {
        console.log('log img', fileList);
    }, [fileList]);

    const handleBeforeUpload = ({ fileList }: { fileList: UploadFile[] }) => {
        if (fileList.length > 1) {
            fileList.shift();
        }
    
        const updatedFileList = fileList.map(file => ({
            uid: file.uid,
            name: file.name,
            lastModified: file.lastModified,
            size: file.size,
            type: file.type,
            originFileObj: file.originFileObj ? { // Kiểm tra nếu originFileObj tồn tại
                uid: file.originFileObj.uid,
                name: file.originFileObj.name,
                type: file.originFileObj.type,
                size: file.originFileObj.size,
                lastModified: file.originFileObj.lastModified
            } : null // Hoặc có thể gán là null nếu bạn không muốn xử lý nếu originFileObj không tồn tại
        }));
    
        sessionStorage.setItem('image', JSON.stringify(updatedFileList.map(file => file.name)));
        setFileList(fileList);
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
        // const storedFileChupBanDangKyDoanhNghiep = sessionStorage.getItem('fileChupBanDangKyDoanhNghiep');

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

    const onChangeLoaiGianHang = (value: string[]) => {
        setLoaiGianHang(value);
        sessionStorage.setItem('loaiGianHang', JSON.stringify(value));
    };


    const onChangeLoaiDonVi = (value: string) => {
        setLoaiDonVi(value);
        sessionStorage.setItem('loaiDonVi', value);
    };
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const handlePreview = async (fileList: UploadFile) => {
        if (!fileList.url && !fileList.preview) {
            fileList.preview = await getBase64(fileList.originFileObj as FileType);
        }

        setPreviewImage(fileList.url || (fileList.preview as string));
        setPreviewOpen(true);
    };
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
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
                        <Select
                            id="loaiGianHang"
                            className="mt-1 w-full"
                            mode="multiple"
                            value={loaiGianHang}
                            onChange={onChangeLoaiGianHang}
                            placeholder="Chọn"
                            maxTagCount="responsive"
                            style={{ width: '100%' }}
                        >
                            {optionLoaiGianHang}
                        </Select>
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
                    <Upload
                        accept=".png,.jpeg,.jpg"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleBeforeUpload}
                        beforeUpload={() => false}
                        className=''

                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{ display: 'none' }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Content2;
