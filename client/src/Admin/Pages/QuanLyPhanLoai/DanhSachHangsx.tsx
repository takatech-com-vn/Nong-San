import React, { useEffect, useState } from 'react';
import { Modal, Popconfirm, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { Manufacturer } from '../../../services/Manufacturer';
import EditHangSX from './Modal/EditHangSX';
import { GrEdit } from 'react-icons/gr';
import { RiDeleteBinLine } from 'react-icons/ri';
import { QuestionCircleOutlined } from '@ant-design/icons';
function DanhSachHangsx() {
  const [data, setData] = useState<Manufacturer[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editHangSX, setEditHangSX] = useState<Manufacturer | null>(null);
  const setSelectedCategory = useState<number | null>(null)[1];

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/product/getmanufacturer`)
      if (response.data.success) {
        setData(response.data.Manufacturer)
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

  const handleEdit = (manufacturerData: Manufacturer) => {
    setOpenModal(true);
    setEditHangSX(manufacturerData);
    setSelectedCategory(manufacturerData.category_id);
  }

  const handleDelete = (manufacturerData: Manufacturer) => {
    axios.delete(`${import.meta.env.VITE_APP_API_URL}/product/deletemanufacturer/${manufacturerData.id}`)
      .then(response => {
        if (response.data.success) {
          // Xóa tin tức khỏi state nếu xóa thành công
          setData(prevData => prevData.filter(item => item.id !== manufacturerData.id));
          message.success('Xóa phân loại thành công');
        } else {
          message.error('Xóa phân loại thất bại');
        }
      })
      .catch(error => {
        console.error('Lỗi xóa phân loại: ', error)
      })
  }

  const columns: ColumnsType<Manufacturer> = [
    {
      title: 'Tên phân loại chính',
      dataIndex: 'maincategory_name',
      key: 'maincategory_name',
      width: '25%'
    },

    {
      title: 'Tên phân loại',
      dataIndex: 'name_category',
      key: 'name_category',
      width: '25%'
    },

    {
      title: 'Tên hãng sản xuất',
      dataIndex: 'name',
      key: 'name',
      width: '25%'
    },

    {
      title: 'Hành động',
      key: 'action',
      width: '25%',
      render: (_, manufacturerData) => (
        <div className='flex gap-4 '>
          {/* ----- Sửa ----- */}
          <GrEdit size={20}
            className='text-[#26A65D]'
            onClick={() => handleEdit(manufacturerData)}
          />

          {/* ----- Xóa ----- */}
          <Popconfirm
            title="Cảnh báo!"
            description="Bạn có chắc chắn muốn xóa?"
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDelete(manufacturerData)}
          >
            <RiDeleteBinLine size={20} className='text-red-500' />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>

      <Table columns={columns} dataSource={data} />

      <Modal
        title="EditHangSX"
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        width={1000}
        footer={false}

      >
        <EditHangSX productManufacturer={editHangSX} setModal={setOpenModal} onUpdateSuccess={fetchData} />
      </Modal>
    </>
  )
}

export default DanhSachHangsx