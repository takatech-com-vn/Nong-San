import React, { useEffect, useState } from 'react';
import { Modal, Popconfirm, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { MainCategory } from '../../../services/MainCategory';
import EditPhanLoaiChinh from './Modal/EditPhanLoaiChinh';
import { GrEdit } from 'react-icons/gr';
import { RiDeleteBinLine } from 'react-icons/ri';
import { QuestionCircleOutlined } from '@ant-design/icons';
function DanhSachPhanLoaiChinh() {
    const [data, setData] = useState<MainCategory[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [editPhanLoaiChinh, setEditPhanLoaiChinh] = useState<MainCategory | null>(null);
  
    const fetchData = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/product/getmaincategory`)
  
          if (response.data.success) {
            setData(response.data.maincategoris)
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
  
    const handleEdit = (maincategoryData: MainCategory) => {
      setOpenModal(true);
      setEditPhanLoaiChinh(maincategoryData);
    }
  
    const handleDelete = (maincategoryData: MainCategory) => {
      axios.delete(`${import.meta.env.VITE_APP_API_URL}/product/deletemaincategory/${maincategoryData.id}`)
        .then(response => {
          if (response.data.success) {
            // Xóa tin tức khỏi state nếu xóa thành công
            setData(prevData => prevData.filter(item => item.id !== maincategoryData.id));
            message.success('Xóa phân loại thành công');
          } else {
            message.error('Xóa phân loại thất bại');
          }
        })
        .catch(() => {
            message.error('Có liên kết với phân loại phụ không thể xóa');
        })
    }
  
    const columns: ColumnsType<MainCategory> = [
  
      {
        title: 'Tên phân loại chính',
        dataIndex: 'name',
        key: 'name',
        width: '70%'
      },
  
      {
        title: 'Hành động',
        key: 'action',
        width: '30%',
        render: (_, maincategoryData) => (
          <div className='flex gap-4 '>
          {/* ----- Sửa ----- */}
          <GrEdit size={20}
            className='text-[#26A65D]'
            onClick={() => handleEdit(maincategoryData)}
          />

          {/* ----- Xóa ----- */}
          <Popconfirm
            title="Cảnh báo!"
            description="Bạn có chắc chắn muốn xóa?"
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDelete(maincategoryData)}
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
              title="EditPhanLoaiChinh"
              centered
              open={openModal}
              onOk={() => setOpenModal(false)}
              onCancel={() => setOpenModal(false)}
              width={1000}
              footer={false}
  
            >
              <EditPhanLoaiChinh mainCategory={editPhanLoaiChinh} setModal={setOpenModal} onUpdateSuccess={fetchData} />
      </Modal>
      </>
    )
}

export default DanhSachPhanLoaiChinh