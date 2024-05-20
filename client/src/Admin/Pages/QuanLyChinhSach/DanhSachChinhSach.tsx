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
  const [modalContent, setModalContent] = useState<string>(''); // State to store modal content
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // State to control modal visibility

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
        message.error("Lỗi lấy dữ liệu chính sách");
      }
    }

    fetch();
  }, []);

  const handleEdit = (policy: Policy) => {
    setOpenModal(true);
    setEditChinhSach(policy);
  }

  const handleDelete = (policy: Policy) => {
    axios.delete(`${import.meta.env.VITE_APP_API_URL}/policy/deletepolicy/${policy.id}`)
      .then(response => {
        if (response.data.success) {
          // Xóa tin tức khỏi state nếu xóa thành công
          setData(prevData => prevData.filter(item => item.id !== policy.id));
          message.success('Xóa chính sách thành công');
        } else {
          message.error('Xóa chính sách thất bại');
        }
      })
      .catch(error => {
        console.error('Lỗi xóa chính sách: ', error)
      })
  }
  const renderDescription = (content: string, record: Policy) => (
    <span key={record.id}>
      <div dangerouslySetInnerHTML={{ __html: content.slice(0, 100) }} />
      {content.length > 100 && <a onClick={() => showModal(content)} className='font-bold'>...Xem thêm</a>}
    </span>
  );

  // Function to show modal and set modal content
  const showModal = (content: string) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  // Function to hide modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
      width: '40%',
      render: renderDescription
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


  return (
    <>
      <Table columns={columns} dataSource={data} />
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
      <Modal
        title="Chi tiết nội dung"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div dangerouslySetInnerHTML={{ __html: modalContent }} />
      </Modal>
    </>
  )
}

export default DanhSachChinhSach
