import React, { useEffect, useState } from 'react';
import { Modal, Popconfirm, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { New } from '../../../services/New';
import '../Admin.css';
import EditNew from './Modal/EditNew';
import { GrEdit } from 'react-icons/gr';
import { RiDeleteBinLine } from 'react-icons/ri';
import { QuestionCircleOutlined } from '@ant-design/icons';

const DanhSachTinTuc: React.FC = () => {
  const [data, setData] = useState<New[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingNews, setEditingNews] = useState<New | null>(null);
  const [modalContent, setModalContent] = useState<string>(''); // State to store modal content
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // State to control modal visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/new/getnew`);
        if (response.data.success) {
          setData(response.data.news);
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        message.error("Lỗi lấy dữ liệu tin tức");
      }
    }

    fetchData();
  }, []);

  const handleEdit = (news: New) => {
    setOpenModal(true);
    setEditingNews(news);
    console.log('Chỉnh sửa tin tức: ', news);
  }

  const handleDelete = (news: New) => {
    axios.delete(`${import.meta.env.VITE_APP_API_URL}/new/deletenew/${news.id}`)
      .then(response => {
        if (response.data.success) {
          // Xóa tin tức khỏi state nếu xóa thành công
          setData(prevData => prevData.filter(item => item.id !== news.id));
          message.success('Xóa tin tức thành công');
        } else {
          message.error('Xóa tin tức thất bại');
        }
      })
      .catch(error => {
        console.error('Lỗi xóa banner: ', error)
      })
  }
  const renderDescription = (content: string, record: New) => (
    <span key={record.id}>
      <div dangerouslySetInnerHTML={{ __html: content.slice(0, 100) }} />
      {content.length > 100 && <a onClick={() => showModal(content)}>...Xem thêm</a>}
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
  const columns: ColumnsType<New> = [

    {
      title: 'Tên tin tức',
      dataIndex: 'name_new',
      key: 'name_new',
      width: '20%'
    },

    {
      title: 'Mô tả ngắn',
      dataIndex: 'short_description',
      key: 'short_description',
      width: '20%'
    },

    {
      title: 'Hình ảnh',
      dataIndex: 'path',
      key: 'path',
      width: '20%',
      render: path => <img src={`${import.meta.env.VITE_APP_API_URL}${path}`} alt="New" style={{ width: '50px', height: '50px' }} />,
    },

    {
      title: 'Mô tả',
      dataIndex: 'content',
      key: 'content',
      width: '20%',
      render:renderDescription
    },

    {
      title: 'Hành động',
      key: 'action',
      width: '20%',
      render: (_, news) => (
        <div className='flex gap-4 '>
          {/* ----- Sửa ----- */}
          <GrEdit size={20}
            className='text-[#26A65D]'
            onClick={() => handleEdit(news)}
          />

          {/* ----- Xóa ----- */}
          <Popconfirm
            title="Cảnh báo!"
            description="Bạn có chắc chắn muốn xóa?"
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDelete(news)}
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
        title="EditNew"
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        width={1000}
        footer={false}
      >
        <EditNew news={editingNews} setModal={setOpenModal} />
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

export default DanhSachTinTuc