import React, { useState } from 'react';
import { Affix, Anchor, Button, Cascader, Col, Collapse, Form, Row, Select } from 'antd';
import { Input } from 'antd';
import { Checkbox } from 'antd';
import { MultipleCascaderProps } from 'antd/es/cascader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
// import Product_variations from './product_variations';
// import { Values } from '../../../services/Values';
// import { AiTwotoneDelete } from 'react-icons/ai';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { DatePicker, } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { Dayjs } from 'dayjs';
import ProductVariations from './ProductVariations';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface ProductType {
    value: string;
    label: string;
}

interface Manufacturer {
    value: string;
    label: string;
}
interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}
interface options {
    value: string | number;
    label: string;
}


const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });



const optionsCheckbox = [
    { label: 'Sản phẩm khuyến mại', value: 'Sản phẩm khuyến mại' },
    { label: 'Nông sản mùa vụ giá tốt', value: 'Nông sản mùa vụ giá tốt' },
    { label: 'Sản phẩm mới', value: 'Sản phẩm mới' },
];

const options: Option[] = [
    {
        label: 'Nông sản đặc trưng tỉnh Đắk Lắk',
        value: 'Nông sản đặc trưng tỉnh Đắk Lắk',
    },
    {
        label: 'Sản phẩm',
        value: 'Sản phẩm',
        children: [
            { value: 'sau_rieng', label: 'Sầu riêng' },
            { value: 'bo', label: 'Bơ' },
            { value: 'tieu', label: 'Tiêu' },
            { value: 'rau_cu', label: 'Rau củ' },
            { value: 'cacao', label: 'Cacao' },
            { value: 'hat_ngu_coc', label: 'Hạt ngũ cốc' },
            { value: 'phan_huu_co', label: 'Phân hữu cơ' },
            { value: 'phan_bon', label: 'Phân bón' },
            { value: 'khac', label: 'Khác' },
            { value: 'macca', label: 'Macca' },
            { value: 'mit_thai', label: 'Mít thái' },
        ],
    },
];
const manufacturersByType: Record<string, Manufacturer[]> = {
    coffee: [
        { value: 'starbucks', label: 'Starbucks' },
        { value: 'dunkin', label: 'Dunkin' }
    ],
    tea: [
        { value: 'lipton', label: 'Lipton' },
        { value: 'twinings', label: 'Twinings' }
    ],
};

const productTypes: ProductType[] = [
    { value: 'coffee', label: 'Coffee' },
    { value: 'tea', label: 'Tea' },
];
const AddProduct = () => {
    const [form] = Form.useForm();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [top, setTop] = React.useState<number>(100);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    //thông tin cơ bản
    const [tenSanPham, setTenSanPham] = useState('');
    const [danhMucSanPham, setDanhMucSanPham] = useState<string[]>([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<CheckboxValueType[]>([]);
    const [thuTuSapXep, setThuTuSapXep] = useState('')
    const [khoHang, setKhoHang] = useState('')
    const [moTaSP, setMoTaSP] = useState("");
    const [hinhSp, setHinhSP] = useState<UploadFile[]>([])

    //thông số kỹ thuật
    const [loaiSanPham, setLoaiSanPham] = useState<string>('');
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [hangSanXuat, setHangSanXuat] = useState<string | undefined>();
    const [banSi, setBanSi] = useState('')
    const [giaSi, setGiaSi] = useState('')
    const [loaiThucPham, setLoaiThucPham] = useState<string[]>([]);
    const [xuatXu, setXuatXu] = useState('')
    const [toChucSanXuat, setToChucSanXuat] = useState('')
    const [slTrungBinhThang, setSlTrungBinhThang] = useState('')
    const [loaiLuuTru, setLoaiLuuTru] = useState<string[]>([]);
    const [organicFood, setOrganicFood] = useState<CheckboxValueType[]>([]);
    const [kieuDongGoi, setKieuDongGoi] = useState<string[]>([]);
    const [trongLuong, setTrongLuong] = useState('')
    const [ngaySanXuat, setNgaySanXuat] = useState<string | null>(null);
    const [ngayHetHan, setNgayHetHan] = useState<string | null>(null);
    const [thanhPhan, setThanhPhan] = useState('')
    const [giamCanDacBiet, setGiamCanDacBiet] = useState<string[]>([]);
    const [maVung, setMaVung] = useState('')
    const [thoiGianBaoQuan, setThoiGianBaoQuan] = useState('')

    //thông tin bán hàng
    const [ma, setMa] = useState('');

    // Thông tin đóng gói
    const [canNang, setCanNang] = useState('')
    const [dai, setDai] = useState('')
    const [rong, setRong] = useState('')
    const [cao, setCao] = useState('')
    const kichThuocDongGoi = { dai, rong, cao };
    // Seo
    const [tieuDeTrang, setTieuDeTrang] = useState('')
    const [tuKhoa, setTuKhoa] = useState('')
    const [moTaTrang, setMoTaTrang] = useState('')
    const [duongDanDep, setDuongDanDep] = useState('')
    const toiUuSeo = { tieuDeTrang, tuKhoa, moTaTrang, duongDanDep };

    const submitFormData = () => {
        //thông tin bán hàng
        const dataBienthe = form.getFieldsValue();
        const thongTinBanHang = { ma, dataBienthe };

        const formData = {
            tenSanPham,
            danhMucSanPham,
            fileList: hinhSp.map(file => file.name),
            // variationsCount: variations.length,
            selectedCheckboxes,
            thuTuSapXep,
            khoHang,
            moTaSP,
            loaiSanPham,
            hangSanXuat,
            banSi,
            giaSi,
            loaiThucPham,
            xuatXu,
            toChucSanXuat,
            slTrungBinhThang,
            loaiLuuTru,
            organicFood,
            kieuDongGoi,
            trongLuong,
            ngaySanXuat,
            ngayHetHan,
            thanhPhan,
            giamCanDacBiet,
            maVung,
            thoiGianBaoQuan,
            ma,
            thongTinBanHang,
            canNang,
            kichThuocDongGoi,
            toiUuSeo,
        };
        console.log('Form Data:', formData);
        // console.log('dataBienthe:', form.getFieldsValue());

    };

    const handleTypeChange = (value: string): void => {
        setLoaiSanPham(value); // Updates the selected product type state
        const newManufacturers = manufacturersByType[value] || [];
        setManufacturers(newManufacturers); // Updates the manufacturers based on the selected product type
    };

    const handleManufacturerChange = (value: string): void => {
        setHangSanXuat(value);  // Set the selected manufacturer
    };

    const handleKhoHangChange = (value: string): void => {
        setKhoHang(value);
    };
    const handleChangeBanSi = (value: string): void => {
        setBanSi(value);
    }
    const handleLoaiThucPhamChange: MultipleCascaderProps<options>['onChange'] = (value) => {
        const selectedValues = value as unknown as string[];
        setLoaiThucPham(selectedValues);
        console.log("Selected Food Types:", value); // Optional: log the current selection
    };

    const handleLoaiLuuTruChange: MultipleCascaderProps<options>['onChange'] = (value) => {
        const selectedValues = value as unknown as string[];
        setLoaiLuuTru(selectedValues); // Đặt giá trị của Loại lưu trữ
    };
    const onChangeCheckbox = (checkedValues: CheckboxValueType[]) => {
        setOrganicFood(checkedValues);
    };

    const handleKieuDongGoiChange: MultipleCascaderProps<options>['onChange'] = (value) => {
        const selectedValues = value as unknown as string[];
        setKieuDongGoi(selectedValues); // Đặt giá trị của Loại lưu trữ
    };
    const handleTrongLuongChange = (value: string): void => {
        setTrongLuong(value);
    };
    const onChangeNgaySanXuat = (date: Dayjs) => {
        console.log(date);
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            setNgaySanXuat(formattedDate);
        } else {
            setNgaySanXuat(null);
        }
    };
    const onChangeNgayHetHan = (date: Dayjs) => {
        console.log(date);
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            setNgayHetHan(formattedDate);
        } else {
            setNgayHetHan(null);
        }
    };

    const handleGiamCanDacBietChange: MultipleCascaderProps<options>['onChange'] = (value) => {
        const selectedValues = value as unknown as string[];
        setGiamCanDacBiet(selectedValues); // Đặt giá trị của Loại lưu trữ
    };

    // Xử lý thay đổi trên Checkbox.Group
    const handleCheckboxChange = (checkedValues: CheckboxValueType[]) => {
        setSelectedCheckboxes(checkedValues);
    };
    const onChangeDanhMuc: MultipleCascaderProps<Option>['onChange'] = (value) => {
        // Ép kiểu giá trị nhận được về mảng chuỗi và lưu vào state
        const selectedValues = value as unknown as string[];
        setDanhMucSanPham(selectedValues);
        // Lưu giá trị vào sessionStorage
    };
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setHinhSP(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    // const handleFormSubmit = (values: Values) => {
    //     console.log("values: " + values);
    // };
    // const addVariation = () => {
    //     const timestamp = Date.now().toString(); // Tạo id từ timestamp
    //     setVariations(prevVariations => [
    //         ...prevVariations,
    //         <div key={timestamp} style={{ position: 'relative', }}>
    //             <Product_variations onSubmit={handleFormSubmit} />
    //             <button
    //                 onClick={() => removeVariation(timestamp)}
    //                 className='text-[30px] text-red-600'
    //                 style={{
    //                     position: 'absolute',
    //                     right: 0,
    //                     top: 0,
    //                     padding: '10px',
    //                     cursor: 'pointer'
    //                 }}
    //             >
    //                 <AiTwotoneDelete />
    //             </button>
    //         </div>
    //     ]);
    // };
    // const removeVariation = (idToRemove: string) => {
    //     setVariations(prevVariations => prevVariations.filter(variation => variation.key !== idToRemove));
    // };

    return (
        <div>
            <React.StrictMode>
                <Row>
                    <Col span={20}>
                        <div id="part-1" className=' ml-5 mb-11' >
                            <h1 className='text-[20px] font-bold'>Thêm mới sản phẩm </h1>
                            <div className='bg-[#FAFAFB] p-2 rounded-[15px] h-auto mt-11'>
                                <span className='text-[18px] text-black font-medium mb-4 w-full'>Thông tin cơ bản</span>
                                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                                    <div className="mb-1 col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="tenSanPham">
                                            Tên sản phẩm <span className='text-red-600'>*</span>
                                        </label>
                                        <Input showCount maxLength={255} value={tenSanPham} onChange={e => setTenSanPham(e.target.value)} />
                                        <div className='mt-2'>
                                            <Checkbox.Group options={optionsCheckbox} defaultValue={['Pear']} onChange={handleCheckboxChange} className='flex flex-col gap-2' />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="danhMucSanPham">
                                                Danh mục sản phẩm<span className='text-red-600'>*</span>
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
                                        <div className="mb-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="thuTuSapXep">
                                                Thứ tự sắp xếp
                                            </label>
                                            <Input placeholder="" value={thuTuSapXep} onChange={e => setThuTuSapXep(e.target.value)} />
                                        </div>
                                        <div className="mb-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                                Kho hàng<span className='text-red-600'>*</span>
                                            </label>
                                            <Select
                                                showSearch
                                                className='w-full'
                                                placeholder="Search to Select"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                onChange={handleKhoHangChange}
                                                value={khoHang}
                                                options={[
                                                    {
                                                        value: 'Kho 1',
                                                        label: 'Kho 1',
                                                    },
                                                    {
                                                        value: 'Kho 2',
                                                        label: 'Kho 2',
                                                    },
                                                ]}
                                            />
                                        </div>

                                    </div>
                                </div>
                                <div className="mb-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                        Mô tả sản phẩm<span className='text-red-600'>*</span>
                                    </label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={moTaSP}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setMoTaSP(data);
                                        }}
                                    />
                                </div>
                                <div className="mb-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                        Hình ảnh sản phẩm<span className='text-red-600'>*</span>
                                    </label>
                                    <Upload
                                        accept=".png,.jpeg,.jpg"
                                        listType="picture-card"
                                        fileList={hinhSp}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                        beforeUpload={() => false}

                                    >
                                        {hinhSp.length >= 10 ? null : uploadButton}
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
                                    <p>(Chú ý : Tải hoặc kéo thả file vào. Hỗ trợ file .jpeg, .jpg, .gif, .bmp, .tif, .png, .ico, .webp, .svg)</p>
                                </div>
                            </div>
                        </div>
                        <div id="part-2" className=' ml-5'>
                            <h1 className='text-[20px] font-bold h-5'></h1>
                            <div className='bg-[#FAFAFB] p-2 rounded-[15px] h-full mt-11'>
                                <a className='text-[18px] text-black font-medium mb-4 '>Thông số kỹ thuật</a>
                                <div className='grid grid-cols-1 gap-3'>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="namebrand">
                                            Loại sản phẩm <span className='text-red-600'>*</span>
                                        </label>
                                        <Select
                                            className='w-full'
                                            showSearch
                                            placeholder="Chọn loại sản phẩm"
                                            onChange={handleTypeChange}
                                        >
                                            {productTypes.map(type => (
                                                <Option key={type.value} value={type.value}>{type.label}</Option>
                                            ))}
                                        </Select>
                                    </div>

                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username2">
                                            Hãng sản xuất
                                        </label>
                                        <Select
                                            showSearch
                                            className='w-full'
                                            placeholder="Chọn hãng sản xuất"
                                            onChange={handleManufacturerChange}
                                            disabled={!loaiSanPham} // Disable if no type is selected
                                        >
                                            {manufacturers.map(manufacturer => (
                                                <Option key={manufacturer.value} value={manufacturer.value}>{manufacturer.label}</Option>
                                            ))}
                                        </Select>

                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="banSi">
                                            Bán sỉ<span className='text-red-600'>*</span>
                                        </label>
                                        <Select
                                            showSearch
                                            className='w-full'
                                            placeholder="Search to Select"
                                            optionFilterProp="children"
                                            onChange={handleChangeBanSi}
                                            value={banSi}
                                            options={[
                                                {
                                                    value: 'Có',
                                                    label: 'Có',
                                                },
                                                {
                                                    value: 'Không',
                                                    label: 'Không',
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="giaSi">
                                            Giá sỉ
                                        </label>
                                        <Input placeholder="" value={giaSi} onChange={e => setGiaSi(e.target.value)} />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Loại thực phẩm
                                        </label>
                                        <Cascader
                                            className='mt-1 h-[36px]'
                                            style={{ width: '100%' }}
                                            options={[
                                                { label: 'Nhà làm', value: 'Nhà làm' },
                                                { label: 'Khác', value: 'Khác' },
                                                { label: 'Theo mùa', value: 'Theo mùa' },
                                                { label: 'Truyền thống', value: 'Truyền thống' },
                                            ]}
                                            multiple
                                            maxTagCount="responsive"
                                            placeholder=""
                                            onChange={handleLoaiThucPhamChange}
                                            value={loaiThucPham}
                                        />

                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Xuất xứ
                                        </label>
                                        <Input placeholder="" value={xuatXu} onChange={e => setXuatXu(e.target.value)} />

                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Tổ chức chịu trách nhiệm sản xuất
                                        </label>
                                        <Input placeholder="" value={toChucSanXuat} onChange={e => setToChucSanXuat(e.target.value)} />

                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Số lượng trung bình / tháng
                                        </label>
                                        <Input placeholder="" value={slTrungBinhThang} onChange={e => setSlTrungBinhThang(e.target.value)} />

                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Loại lưu trữ
                                        </label>
                                        <Cascader
                                            className='mt-1 h-[36px]'
                                            style={{ width: '100%' }}
                                            options={[
                                                {
                                                    label: 'Đông lạnh',
                                                    value: 'Đông lạnh',
                                                },
                                                {
                                                    label: 'Khác',
                                                    value: 'Khác',
                                                },
                                            ]}
                                            value={loaiLuuTru} // Đặt giá trị đã chọn
                                            onChange={handleLoaiLuuTruChange} // Xử lý sự kiện thay đổi
                                            multiple
                                            maxTagCount="responsive"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Organic Food
                                        </label>
                                        <Checkbox.Group options={[
                                            { label: true, value: true }

                                        ]} defaultValue={['Pear']} onChange={onChangeCheckbox} className='flex flex-col gap-2' />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Kiểu đóng gói
                                        </label>
                                        <Cascader
                                            className='mt-1 h-[36px]'
                                            style={{ width: '100%' }}
                                            options={[
                                                {
                                                    label: 'Hộp',
                                                    value: 'Hộp',
                                                },
                                                {
                                                    label: 'Bao',
                                                    value: 'Bao',
                                                },
                                                {
                                                    label: 'Gói',
                                                    value: 'Gói',
                                                },
                                                {
                                                    label: 'Bình',
                                                    value: 'Bình',
                                                },
                                                {
                                                    label: 'Thùng',
                                                    value: 'Thùng',
                                                },
                                                {
                                                    label: 'Túi',
                                                    value: 'Túi',
                                                },
                                                {
                                                    label: 'Chai',
                                                    value: 'Chai',
                                                },
                                            ]}
                                            multiple
                                            maxTagCount="responsive"
                                            placeholder=""
                                            onChange={handleKieuDongGoiChange}
                                            value={kieuDongGoi}
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Trọng lượng
                                        </label>
                                        <Select
                                            className='mt-1 h-[36px]'
                                            style={{ width: '100%' }}
                                            options={[
                                                {
                                                    label: '10g',
                                                    value: '10g',
                                                },
                                                {
                                                    label: '20g',
                                                    value: '20g',
                                                },
                                                {
                                                    label: '30g',
                                                    value: '30g',
                                                }, {
                                                    label: '50g',
                                                    value: '50g',
                                                }, {
                                                    label: '100g',
                                                    value: '100g',
                                                },
                                                {
                                                    label: '150g',
                                                    value: '150g',
                                                },
                                            ]}
                                            maxTagCount="responsive"
                                            value={trongLuong}
                                            onChange={handleTrongLuongChange}
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Thành phần
                                        </label>
                                        <TextArea rows={2} value={thanhPhan} onChange={e => setThanhPhan(e.target.value)} />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Ngày sản xuất
                                        </label>
                                        <DatePicker className='w-full' onChange={onChangeNgaySanXuat} />

                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Ngày hết hạn
                                        </label>
                                        <DatePicker className='w-full' onChange={onChangeNgayHetHan} />

                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Giảm cân đặc biệt
                                        </label>
                                        <Cascader
                                            className='mt-1 h-[36px]'
                                            style={{ width: '100%' }}
                                            options={[
                                                {
                                                    label: 'Không caffein',
                                                    value: 'Không caffein',
                                                },
                                                {
                                                    label: 'Không cholesterol',
                                                    value: 'Không cholesterol',
                                                },
                                                {
                                                    label: 'Không gluten',
                                                    value: 'Không gluten',
                                                }, {
                                                    label: 'Không GMO',
                                                    value: 'Không GMO',
                                                }, {
                                                    label: 'Không lactose',
                                                    value: 'Không lactose',
                                                },
                                                {
                                                    label: 'Ít béo',
                                                    value: 'Ít béo',
                                                },
                                                {
                                                    label: 'Ít Sodium',
                                                    value: 'Ít Sodium',
                                                }, {
                                                    label: 'Ít đường',
                                                    value: 'Ít đường',
                                                }, {
                                                    label: 'Không đường',
                                                    value: 'Không đường',
                                                }, {
                                                    label: 'Không Trans Fat',
                                                    value: 'Không Trans Fat',
                                                },
                                            ]}
                                            multiple
                                            maxTagCount="responsive"
                                            onChange={handleGiamCanDacBietChange}
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Mã vùng
                                        </label>
                                        <Input placeholder="" value={maVung} onChange={e => setMaVung(e.target.value)} />

                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Thời gian bảo quản
                                        </label>

                                        <Input placeholder="" value={thoiGianBaoQuan} onChange={e => setThoiGianBaoQuan(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="part-3" className=' ml-5 mb-11 ' >
                            <h1 className='text-[20px] font-bold h-5'></h1>
                            <div className='bg-[#FAFAFB] p-2 rounded-[15px] h-auto mt-11'>
                                <span className='text-[18px] text-black font-medium mb-4 w-full'>Thông tin bán hàng</span>
                                <div className='grid grid-cols-2 gap-3'>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="ma">
                                            Mã<span className='text-red-600'>*</span>
                                        </label>
                                        <Input placeholder="" value={ma} onChange={e => setMa(e.target.value)} />

                                    </div>
                                </div>
                                <div className="mb-1 w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                        Các biến thể<span className='text-red-600'>*</span>
                                    </label>
                                    {/* {variations} */}


                                    <ProductVariations form={form} />

                                    {/* <button className='w-full p-2 rounded-lg border-dotted border-[2px] border-green-700'
                                        onClick={addVariation}>
                                        Thêm phân loại hàng
                                    </button> */}

                                </div>
                            </div>
                        </div>
                        <div id="part-4" className=' ml-5 mb-11 ' >
                            <h1 className='text-[20px] font-bold h-5'></h1>
                            <div className='bg-[#FAFAFB] p-2 rounded-[15px] h-auto mt-11'>
                                <span className='text-[18px] text-black font-medium mb-4 w-full'>Thông tin đóng gói</span>
                                <div className='grid grid-cols-1 gap-3'>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Cân nặng (Sau khi đóng gói)<span className='text-red-600'>*</span>
                                        </label>
                                        <Input placeholder="Gram" suffix="Garm" value={canNang} onChange={e => setCanNang(e.target.value)} />
                                    </div>
                                </div>
                                <div className=''>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Kích thước đóng gói (cm)<br />
                                            <p className='text-[12px]'>(Phí vận chuyển thực tế sẽ thay đổi nếu bạn nhập sai khích thước)</p>
                                        </label>
                                        <div className='grid grid-cols-3 gap-3'>
                                            <Form.Item label="Dài:" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                                <Input placeholder="Dài" value={dai} onChange={e => setDai(e.target.value)} />
                                            </Form.Item>
                                            <Form.Item label="Rộng:" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                                <Input placeholder="Rộng" value={rong} onChange={e => setRong(e.target.value)} />
                                            </Form.Item>
                                            <Form.Item label="Cao:" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                                <Input placeholder="Cao" value={cao} onChange={e => setCao(e.target.value)} />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="part-5" className=' ml-5 mb-11 ' >
                            <h1 className='text-[20px] font-bold h-5'></h1>
                            <div className='bg-[#FAFAFB] p-2 rounded-[15px] h-auto mt-11'>
                                <span className='text-[18px] text-black font-medium mb-4 w-full'>SEO</span>
                                <Collapse
                                    items={[{
                                        key: '1', label: 'Tối ưu SEO', children:
                                            <div>
                                                <p>Thiết lập các thẻ mô tả giúp khách hàng dễ dàng tìm thấy trang trên công cụ tìm kiếm như Google.</p>
                                                <div className='grid grid-cols-1 gap-3'>
                                                    <div className="mb-1">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="tieuDeTrang">
                                                            Tiêu đề trang
                                                        </label>
                                                        <Input placeholder="Tiêu đề trang" value={tieuDeTrang} onChange={e => setTieuDeTrang(e.target.value)} />

                                                    </div>
                                                    <div className="mb-1">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="tuKhoa">
                                                            Từ khóa
                                                        </label>
                                                        <TextArea rows={4} value={tuKhoa} onChange={e => setTuKhoa(e.target.value)} />
                                                    </div>
                                                    <div className="mb-1">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="moTaTrang">
                                                            Mô tả trang
                                                        </label>
                                                        <TextArea rows={4} value={moTaTrang} onChange={e => setMoTaTrang(e.target.value)} />

                                                    </div>
                                                    <div className="mb-1">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="duongDanDep">
                                                            Đường dẫn đẹp
                                                        </label>
                                                        <Input placeholder="Đường dẫn đẹp" value={duongDanDep} onChange={e => setDuongDanDep(e.target.value)} />

                                                    </div>
                                                </div>
                                            </div>
                                    }]}
                                />
                            </div>
                        </div>

                        <div className='flex items-center justify-end mb-[500px]'>
                            <Button style={{ right: 0 }} >
                                Quay lại
                            </Button>
                            <Button type="primary" onClick={submitFormData}>
                                Lưu lại
                            </Button>
                        </div>
                    </Col>

                    <Col span={4}>
                        <Affix offsetTop={top}>
                            <Anchor
                                replace
                                items={[
                                    {
                                        key: 'part-1',
                                        href: '#part-1',
                                        title: 'Thông tin cơ bản',
                                    },
                                    {
                                        key: 'part-2',
                                        href: '#part-2',
                                        title: 'Thông số kỹ thuật',
                                    },
                                    {
                                        key: 'part-3',
                                        href: '#part-3',
                                        title: 'Thông tin bán hàng',
                                    },
                                    {
                                        key: 'part-4',
                                        href: '#part-4',
                                        title: 'Thông tin đóng gói',
                                    }, {
                                        key: 'part-5',
                                        href: '#part-5',
                                        title: 'SEO',
                                    },
                                ]}
                            />
                        </Affix>
                    </Col>
                </Row>
            </React.StrictMode>

        </div>
    );
};

export default AddProduct;