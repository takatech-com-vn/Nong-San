import React, { useEffect, useState } from 'react';
import { Modal, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { Policy } from '../../../services/Policy';
import '../Admin.css';
import EditChinhSach from './Modal/EditChinhSach';

const DanhSachChinhSach: React.FC = () => {

  const [data, setData] = useState<Policy[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editChinhSach, setEditChinhSach] = useState<Policy | null>(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/policy/listpolicy`)

        if (response.data.success) {
          setData(response.data.policis)
        } else {
          message.error(response.data.message)
        }
      } catch (error) {
        message.error("Lỗi lấy dữ liệu tin tức");
      }
    }

    fetch();
  }, []);

  const handleEdit = (policy: Policy) => {
    setOpenModal(true);
    setEditChinhSach(policy);
    console.log("Chỉnh sửa chính sách: ", policy)
  }

  const handleDelete = (policy: Policy) => {
    axios.delete(`${import.meta.env.VITE_APP_API_URL}/policy/deletepolicy/${policy.id}`)
      .then(response => {
        if (response.data.success) {
          // Xóa tin tức khỏi state nếu xóa thành công
          setData(prevData => prevData.filter(item => item.id !== policy.id));
          message.success('Xóa tin tức thành công');
        } else {
          message.error('Xóa tin tức thất bại');
        }
      })
      .catch(error => {
        console.error('Lỗi xóa banner: ', error)
      })
  }

  const columns: ColumnsType<Policy> = [

    {
      title: 'Tên chính sách',
      dataIndex: 'name',
      key: 'name',
      width: '30%'
    },

    {
      title: 'Mô tả',
      dataIndex: 'content',
      key: 'content',
      width: '40%'
    },

    {
      title: 'Hành động',
      key: 'action',
      width: '30%',
      render: (_, policy) => (
        <div>
          <button
            className="button-edit"
            onClick={() => handleEdit(policy)}
          >
            Sửa
          </button>
          <Modal
            title="EditChinhSach"
            centered
            open={openModal}
            onOk={() => setOpenModal(false)}
            onCancel={() => setOpenModal(false)}
            width={1000}
            footer={false}

          >
            <EditChinhSach policy={editChinhSach} setModal={setOpenModal} />
          </Modal>
          <button
            className="button-delete"
            onClick={() => handleDelete(policy)}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];


  return <Table columns={columns} dataSource={data} />
}

export default DanhSachChinhSach
