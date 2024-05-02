import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { New } from '../../../services/New';
import '../Admin.css';

const DanhSachTinTuc: React.FC = () => {
  const [data, setData] = useState<New[]>([]);

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
      width: '20%'
    },

    {
      title: 'Hành động',
      key: 'action',
      width: '20%',
      render: (_, news) => (
        <div>
          <button 
            className="button-edit"
            onClick={() => handleEdit(news)}
          >
            Sửa
          </button>
          <button 
            className="button-delete"
            onClick={() => handleDelete(news)}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];


  return <Table columns={columns} dataSource={data} />
}

export default DanhSachTinTuc