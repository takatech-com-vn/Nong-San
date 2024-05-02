import React, { ReactElement, useState } from 'react';
import { Affix, Anchor, Button, Cascader, Col, Collapse, Row, Select } from 'antd';
import { Input } from 'antd';
import { Checkbox } from 'antd';
import { MultipleCascaderProps } from 'antd/es/cascader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import Product_variations from './product_variations';
import { Values } from '../../../services/Values';
import { AiTwotoneDelete } from 'react-icons/ai';
const { TextArea } = Input;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });


const onChangeCheckbox: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    console.log('checked = ', checkedValues);
};
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};

const optionsCheckbox = [
    { label: 'Sản phẩm khuyến mại', value: 'Sản phẩm khuyến mại' },
    { label: 'Nông sản mùa vụ giá tốt', value: 'Nông sản mùa vụ giá tốt' },
    { label: 'Sản phẩm mới', value: 'Sản phẩm mới' },
];
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

const AddProduct = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [top, setTop] = React.useState<number>(100);
    const [danhMucSanPham, setDanhMucSanPham] = useState<string[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [description] = useState("");
    const [variations, setVariations] = useState<ReactElement[]>([]);

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
        setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const handleFormSubmit = (values: Values) => {
        console.log("values: " + JSON.stringify(values));
    };
    const addVariation = () => {
        setVariations(prevVariations => [
            ...prevVariations,
            <div key={prevVariations.length} style={{ position: 'relative', }}>
                <Product_variations onSubmit={handleFormSubmit} />
                <button
                    onClick={() => removeVariation(prevVariations.length)}
                    className='text-[30px] text-red-600'
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        padding: '10px',
                        cursor: 'pointer'
                    }}
                >
                    <AiTwotoneDelete />
                </button>
            </div>
        ]);
    };
    const removeVariation = (index: number) => {
        setVariations(prevVariations => prevVariations.filter((_, i) => i !== index));
    };
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="namebrand">
                                            Tên sản phẩm <span className='text-red-600'>*</span>
                                        </label>
                                        <Input showCount maxLength={255} onChange={onChange} />
                                        <div className='mt-2'>
                                            <Checkbox.Group options={optionsCheckbox} defaultValue={['Pear']} onChange={onChangeCheckbox} className='flex flex-col gap-2' />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username2">
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
                                            <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                                Thứ tự sắp xếp<span className='text-red-600'>*</span>
                                            </label>
                                            <Input placeholder="" />
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
                                                options={[
                                                    {
                                                        value: '1',
                                                        label: 'Kho 1',
                                                    },
                                                    {
                                                        value: '2',
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
                                        data={description}
                                    />
                                </div>
                                <div className="mb-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                        Hình ảnh sản phẩm<span className='text-red-600'>*</span>
                                    </label>
                                    <Upload
                                        accept=".png,.jpeg,.jpg"
                                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                    >
                                        {fileList.length >= 10 ? null : uploadButton}
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
                                            showSearch
                                            className='w-full'
                                            placeholder="Search to Select"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={[
                                                {
                                                    value: '1',
                                                    label: 'Kho 1',
                                                },
                                                {
                                                    value: '2',
                                                    label: 'Kho 2',
                                                },
                                            ]}
                                        />
                                    </div>

                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username2">
                                            Hãng sản xuất
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
                                            options={[
                                                {
                                                    value: '1',
                                                    label: 'Kho 1',
                                                },
                                                {
                                                    value: '2',
                                                    label: 'Kho 2',
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Bán sỉ<span className='text-red-600'>*</span>
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
                                            options={[
                                                {
                                                    value: '1',
                                                    label: 'Có',
                                                },
                                                {
                                                    value: '2',
                                                    label: 'Không',
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Giá sỉ
                                        </label>
                                        <Input placeholder="" />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Loại thực phẩm
                                        </label>
                                        <Cascader
                                            className='mt-1 h-[36px]'
                                            style={{ width: '100%' }}
                                            options={[
                                                {
                                                    label: 'Nhà làm',
                                                    value: 'Nhà làm',
                                                },
                                                {
                                                    label: 'Khác',
                                                    value: 'Khác',
                                                },
                                                {
                                                    label: 'Theo mùa',
                                                    value: 'Theo mùa',
                                                },
                                                {
                                                    label: 'Truyền thống',
                                                    value: 'Truyền thống',
                                                },
                                            ]}
                                            multiple
                                            maxTagCount="responsive"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Xuất xứ
                                        </label>
                                        <Input placeholder="" />

                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Tổ chức chịu trách nhiệm sản xuất
                                        </label>
                                        <Input placeholder="" />

                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Số lượng trung bình / tháng
                                        </label>
                                        <Input placeholder="" />

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
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Trọng lượng
                                        </label>
                                        <Cascader
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
                                            multiple
                                            maxTagCount="responsive"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Thành phần
                                        </label>
                                        <Input placeholder="" />

                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Ngày sản xuất
                                        </label>
                                        <Input placeholder="" />

                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Ngày hết hạn
                                        </label>
                                        <Input placeholder="" />

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
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Mã vùng
                                        </label>
                                        <Input placeholder="" />

                                    </div>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Thời gian bảo quản
                                        </label>

                                        <Input placeholder="" />
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Mã<span className='text-red-600'>*</span>
                                        </label>
                                        <Input placeholder="" />

                                    </div>
                                </div>
                                <div className="mb-1 w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                        Các biến thể<span className='text-red-600'>*</span>
                                    </label>
                                    <button className='w-full p-2 rounded-lg border-dotted border-[2px] border-green-700'
                                        onClick={addVariation}>
                                        Thêm phân loại hàng
                                    </button>
                                    {variations}
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
                                        <Input placeholder="Gram" />

                                    </div>
                                </div>
                                <div className=''>
                                    <div className="mb-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                            Kích thước đóng gói (cm)<br />
                                            <p className='text-[12px]'>(Phí vận chuyển thực tế sẽ thay đổi nếu bạn nhập sai khích thước)</p>
                                        </label>
                                        <div className='grid grid-cols-3 gap-3'>
                                            <Input placeholder="Dài" />
                                            <Input placeholder="Rộng" />
                                            <Input placeholder="Cao" />
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
                                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                                            Tiêu đề trang<span className='text-red-600'>*</span>
                                                        </label>
                                                        <Input placeholder="Tiêu đề trang" />

                                                    </div>
                                                    <div className="mb-1">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                                            Từ khóa<span className='text-red-600'>*</span>
                                                        </label>
                                                        <TextArea rows={4} />
                                                    </div>
                                                    <div className="mb-1">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                                            Mô tả trang<span className='text-red-600'>*</span>
                                                        </label>
                                                        <TextArea rows={4} />

                                                    </div>
                                                    <div className="mb-1">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2 " htmlFor="danhmucsanpham">
                                                            Đường dẫn đẹp<span className='text-red-600'>*</span>
                                                        </label>
                                                        <Input placeholder="Đường dẫn đẹp" />

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
                            <Button type="primary"  >
                                Tiếp tục
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