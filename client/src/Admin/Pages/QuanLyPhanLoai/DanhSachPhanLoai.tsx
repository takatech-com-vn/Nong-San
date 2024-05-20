import React, { useEffect, useState } from 'react';
import { Modal, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { ProductCategory } from '../../../services/ProductCategory';
import EditPhanLoai from './Modal/EditPhanLoai';

function DanhSachPhanLoai() {
  const [data, setData] = useState<ProductCategory[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editPhanLoai, setEditPhanLoai] = useState<ProductCategory | null>(null);
  const setSelectedCategory = useState<number | null>(null)[1];

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/product/getcategory`)

        if (response.data.success) {
          setData(response.data.productcategoris)
        } else {
          message.error(response.data.message)
        }
      } catch (error) {
        message.error("Lỗi lấy dữ liệu phân loại");
      }
    }

  useEffect(() => {
      fetchData();
  }, []);

  const handleEdit = (categoryData: ProductCategory) => {
    setOpenModal(true);
    setEditPhanLoai(categoryData);
    setSelectedCategory(categoryData.maincategory_id);
  }

  const handleDelete = (categoryData: ProductCategory) => {
    axios.delete(`${import.meta.env.VITE_APP_API_URL}/product/deletecategory/${categoryData.id}`)
      .then(response => {
        if (response.data.success) {
          // Xóa tin tức khỏi state nếu xóa thành công
          setData(prevData => prevData.filter(item => item.id !== categoryData.id));
          message.success('Xóa phân loại thành công');
        } else {
          message.error('Xóa phân loại thất bại');
        }
      })
      .catch(() => {
        message.error('Có liên kết với hãng sản xuất không thể xóa');
      })
  }

  const columns: ColumnsType<ProductCategory> = [

    {
      title: 'Tên phân loại chính',
      dataIndex: 'name',
      key: 'name',
      width: '35%'
    },

    {
      title: 'Tên phân loại',
      dataIndex: 'name_category',
      key: 'name',
      width: '35%'
    },

    {
      title: 'Hành động',
      key: 'action',
      width: '30%',
      render: (_, categoryData) => (
        <div>
          <button
            className="button-edit"
            onClick={() => handleEdit(categoryData)}
          >
            Sửa
          </button>

          <button
            className="button-delete"
            onClick={() => handleDelete(categoryData)}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
    
    <Table columns={columns} dataSource={data} />
    
    <Modal
            title="EditPhanLoai"
            centered
            open={openModal}
            onOk={() => setOpenModal(false)}
            onCancel={() => setOpenModal(false)}
            width={1000}
            footer={false}

          >
            <EditPhanLoai productCategory={editPhanLoai} setModal={setOpenModal} onUpdateSuccess={fetchData}/>
    </Modal>
    </>
  )
}

export default DanhSachPhanLoai