import React, { useEffect, useState } from 'react';
import { Modal, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { Manufacturer } from '../../../services/Manufacturer';
import EditHangSX from './Modal/EditHangSX';

function DanhSachHangsx() {
    const [data, setData] = useState<Manufacturer[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [editHangSX, setEditHangSX] = useState<Manufacturer | null>(null);
  
    useEffect(() => {
      const fetch = async () => {
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
  
      fetch();
    }, []);
  
    const handleEdit = (manufacturerData: Manufacturer) => {
      setOpenModal(true);
      setEditHangSX(manufacturerData);
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
        title: 'Tên phân loại',
        dataIndex: 'name_category',
        key: 'name_category',
        width: '30%'
      },

      {
        title: 'Tên hãng sản xuất',
        dataIndex: 'name',
        key: 'name',
        width: '30%'
      },
  
      {
        title: 'Hành động',
        key: 'action',
        width: '30%',
        render: (_, manufacturerData) => (
          <div>
            <button
              className="button-edit"
              onClick={() => handleEdit(manufacturerData)}
            >
              Sửa
            </button>
  
            <button
              className="button-delete"
              onClick={() => handleDelete(manufacturerData)}
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
              title="EditHangSX"
              centered
              open={openModal}
              onOk={() => setOpenModal(false)}
              onCancel={() => setOpenModal(false)}
              width={1000}
              footer={false}
  
            >
              <EditHangSX productManufacturer={editHangSX} setModal={setOpenModal} />
      </Modal>
      </>
    )
}

export default DanhSachHangsx