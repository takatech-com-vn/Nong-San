import React, { useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, FormInstance, GetProp, Input, Upload, UploadFile, UploadProps, Image, Tooltip } from 'antd';
// import { UploadChangeParam } from 'antd/es/upload';
interface ProductVariationsProps {
  form: FormInstance;
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ProductVariations: React.FC<ProductVariationsProps> = ({ form }) => {
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [itemCount, setItemCount] = useState(1);
  // const [mainImage, setMainImage] = useState<UploadFile[]>([]);
  const handleAdd = (add: () => void): void => {
    if (itemCount < 2) {
      add();
      setItemCount(itemCount + 1);
    }
  };

  const handleRemove = (name: number, remove: (index: number) => void): void => {
    remove(name);
    setItemCount(itemCount - 1);
  };


  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleImageChange = (fieldKey: number, subFieldKey: number, { fileList }: { fileList: UploadFile[] }) => {
    const items = form.getFieldValue('items');
    items[fieldKey].list[subFieldKey].imageFileList = fileList;
    form.setFieldsValue({ items });
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <Form
      layout="vertical"
      form={form}
      name="dynamic_form_complex"
      autoComplete="off"
      initialValues={{ items: [{}] }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div className='w-full'>
            {fields.map((field) => (
              <Card
                className='mb-3'
                size="small"
                title={`Biến thể ${field.name + 1}`}
                key={field.key}
                extra={
                  <Tooltip placement="top" title={`Xóa biến thể ${field.name + 1}`}>
                    <CloseOutlined onClick={() => handleRemove(field.name, remove)} />
                  </Tooltip>

                }
              >
                <Form.Item label="Phân loại theo:" name={[field.name, 'phanLoaiTheo']} >
                  <Input />
                </Form.Item>

                {/* Nest Form.List */}
                <Form.Item label="Các giá trị:">
                  <Form.List name={[field.name, 'list']}>
                    {(subFields, subOpt) => (
                      <div >
                        {subFields.map((subField) => (
                          <div key={subField.key} className=' w-full bg-slate-100 rounded-lg relative flex justify-center gap-5 p-6 mb-3' >

                            <span className='absolute left-2 top-2'>{`${subField.name + 1}`}</span>
                            <div className='grid grid-cols-2 gap-x-5'>
                              <Form.Item label='Giá trị:' name={[subField.name, 'giaTri']}>
                                <Input placeholder="Vd: Màu đỏ, v.v." />
                              </Form.Item>

                              <Form.Item label='Giá bán:' name={[subField.name, 'giaBan']}>
                                <Input placeholder="Giá bán" />
                              </Form.Item>

                              <Form.Item label='Số lượng:' name={[subField.name, 'soLuong']}>
                                <Input placeholder="Số lượng" />
                              </Form.Item>

                              <Form.Item label='Giảm giá:' name={[subField.name, 'giamGia']}>
                                <Input placeholder="Giảm giá" />
                              </Form.Item>



                            </div>


                            <Form.Item noStyle name={[subField.name, 'imageFileList']}>
                              <Form.Item
                                name={[field.name, 'list', subField.name, 'imageFileList']} label="Hình ảnh"
                                rules={[{ required: true, message: "Vui lòng chọn hình ảnh" }]}
                              >
                                <Upload
                                  listType="picture-card"
                                  fileList={form.getFieldValue(['items', field.name, 'list', subField.name, 'imageFileList']) || []}
                                  onPreview={handlePreview}
                                  onChange={(info) => handleImageChange(field.name, subField.name, info)}
                                  beforeUpload={() => false}
                                >
                                  {(form.getFieldValue(['items', field.name, 'list', subField.name, 'imageFileList']) || []).length < 1 && uploadButton}
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
                            </Form.Item>

                            <Tooltip placement="top" title='Xóa giá trị'>
                              <CloseOutlined className='absolute right-2 top-2 text-red-500'
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }} />
                            </Tooltip>
                          </div>
                        ))}
                        <Button type="dashed" onClick={() => subOpt.add()} block>
                          Thêm các giá trị
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            {itemCount < 2 && (  // Chỉ hiển thị nút thêm nếu số lượng ít hơn 2
              <Button type="dashed" onClick={() => handleAdd(add)} block>
                Thêm phân loại hàng
              </Button>
            )}
          </div>
        )}
      </Form.List>

      {/* <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item> */}
    </Form>
  );
};

export default ProductVariations;