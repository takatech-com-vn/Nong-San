import React, { useState, useEffect } from 'react';
import {
  Form,
  GetProp,
  Image,
  Input,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { Values } from '../../../services/Values';
import { PlusOutlined } from '@ant-design/icons';


interface Props {
  onSubmit: (values: Values) => void;
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function Product_variations(props: Props) {

  const [form] = Form.useForm();

  // Khai báo state cho từng trường
  const [categoryProduct, setCategoryProduct] = useState('');
  const [quantityProduct, setQuantityProduct] = useState('');
  const [priceProduct, setPriceProduct] = useState('');
  const [priceCoupons, setPriceCoupons] = useState('');
  const [couponsProduct, setCouponsProduct] = useState('');
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);

  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const onFinish = (values: Values) => {
    props.onSubmit(values);
  };

  // Sử dụng useEffect để đặt giá trị mặc định khi component được render
  useEffect(() => {
    form.setFieldsValue({
      category_product: categoryProduct,
      quantity_product: quantityProduct,
      price_product: priceProduct,
      price_coupons: priceCoupons,
      coupons_product: couponsProduct,
    });
  }, [categoryProduct, quantityProduct, priceProduct, priceCoupons, couponsProduct]);


  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleChange: UploadProps['onChange'] = ({fileList: newFileList }) =>
    setImageFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
                 <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <Form form={form} onFinish={onFinish} className="w-full rounded " style={{ marginTop: '50px', marginBottom: '20px' }}>
      <h2 className="mb-4 text-xl font-bold text-gray-700">Phân loại</h2>
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row  bg-gray-100">
        <div className="w-full sm:w-1/2 md:w-full lg:w-1/3 p-4">
          <Form.Item label="Phân loại" name="category_product">
            <Input placeholder="Phân loại sản phẩm" onChange={e => setCategoryProduct(e.target.value)} />
          </Form.Item>

          <Form.Item label="Số lượng" name="quantity_product">
            <Input placeholder="Số lượng sản phẩm" onChange={e => setQuantityProduct(e.target.value)} />
          </Form.Item>
        </div>
        <div className="w-full sm:w-1/2 md:w-full lg:w-1/3 p-4">
          <Form.Item label="Giá bán" name="price_product">
            <Input placeholder="Giá bán" onChange={e => setPriceProduct(e.target.value)} />
          </Form.Item>

          <Form.Item label="Giá đã giảm" name="price_coupons">
            <Input placeholder="Giá đã giảm" onChange={e => setPriceCoupons(e.target.value)} />
          </Form.Item>
        </div>
        <div className="w-full sm:w-1/2 md:w-full lg:w-1/3 p-4">

          <Form.Item label="Áp dụng giảm giá" name="coupons_product">
            <Select placeholder="Áp dụng giảm giá sản phẩm" onChange={setCouponsProduct} />
          </Form.Item>

          <Form.Item label="Hình ảnh sản phẩm" name="product_image">
            <Upload
              accept=".png,.jpeg,.jpg"
              listType="picture-card"
              fileList={imageFileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {imageFileList.length >= 1 ? null : uploadButton}
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
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}

export default Product_variations
