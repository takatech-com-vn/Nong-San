import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { Banner } from '../../../services/Banner';
import '../Admin.css';

const DanhSachSlide: React.FC = () => {
  const [data, setData] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePC = await axios.get(`${import.meta.env.VITE_APP_API_URL}/slide/getlistslidepc`);
        const responseMobile = await axios.get(`${import.meta.env.VITE_APP_API_URL}/slide/getlistslidemobile`);
        const dataPCs = responsePC.data.banner_pcs.map((item: Banner) => ({...item, type: 'pc'}));
        const dataMobiles = responseMobile.data.banner_mobiles.map((item: Banner) => ({...item, type: 'mobile'}));
        setData([...dataPCs, ...dataMobiles]);
      } catch (error) {
        console.error('fetch Data error', error);
      }
    };
  
    fetchData();
  }, [])

  const handleEdit = (banner: Banner) => {
    // Logic để chỉnh sửa banner
    console.log('Chỉnh sửa banner: ', banner);
  };
  
  const handleDelete = (banner: Banner) => {
    // Xác định URL dựa trên loại banner
    const url = banner.type === 'pc' 
    ? `${import.meta.env.VITE_APP_API_URL}/slide/deletebannerPC/${banner.id}`
    : `${import.meta.env.VITE_APP_API_URL}/slide/deletebannermobile/${banner.id}`;

    axios.delete(url)
      .then(response => {
        if (response.data.success) {
          // Xóa banner khỏi state nếu xóa thành công
          setData(prevData => prevData.filter(item => item.id !== banner.id));
          message.success('Xóa banner thành công');
        } else {
          message.error('Xóa banner thất bại');
        }
      })
      .catch(error => {
        console.error('Lỗi xóa banner: ', error)
      })
  };

  const columns: ColumnsType<Banner> = [
  
    {
      title: 'Tên Banner',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
    },
  
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      width: '25%',
    },
  
    {
      title: 'Hình ảnh',
      dataIndex: 'path',
      key: 'path',
      width: '25%',
      render: (_, banner) => (
        <img 
          src={`${import.meta.env.VITE_APP_API_URL}${banner.path}`} 
          alt="Banner" 
          style={{ 
            width: banner.type === 'pc' ? '100px' : '50px', 
            height: banner.type === 'pc' ? '50px' : '80px' 
          }} 
        />
      ),
    },
  
    {
      title: 'Hành động',
      key: 'action',
      width: '25%',
      render: (_, banner) => (
        <div>
          <button 
            className="button-edit"
            onClick={() => handleEdit(banner)}
          >
            Sửa
          </button>
          <button 
            className="button-delete"
            onClick={() => handleDelete(banner)}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />
};

export default DanhSachSlide;
