import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { FaBalanceScale, FaChartLine, FaGift, FaListUl, FaStore, FaTachometerAlt, FaUserAlt, FaWarehouse } from 'react-icons/fa';
import QuanLyHonHang from './Pages/QuanLyHonHang';
import DanhSachChinhSach from './Pages/QuanLyChinhSach/DanhSachChinhSach';
import ThemChinhSach from './Pages/QuanLyChinhSach/ThemChinhSach';
import Loader from '../components/Loader/Loader';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import ThemSlidePC from './Pages/QuanLySlide/ThemSlidePC';
import ThemSlideMobile from './Pages/QuanLySlide/ThemSlideMobile';
import DanhSachSlide from './Pages/QuanLySlide/DanhSachSlide';
import ThemTinTuc from './Pages/QuanLyTinTuc/ThemTinTuc';
import DanhSachTinTuc from './Pages/QuanLyTinTuc/DanhSachTinTuc';

const { Header, Sider, Content } = Layout;

const Admin: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const user = useSelector((state: RootState) => state.user.user);
    console.log('admin', user)
    useEffect(() => {
        if (user) {
            // Kiểm tra role của người dùng
            if (user.role === 'Admin') {
                setIsLoading(false);
            } else {
                // Nếu người dùng không phải là Brand, điều hướng về trang chính
                navigate('/');
            }
        }
    }, [user, navigate]);

    const [collapsed, setCollapsed] = useState(false);
    const [currentItem, setCurrentItem] = useState('');
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    if (isLoading) {
        return <div><Loader /></div>;
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh', position: 'fixed' }}
            >
                <div className="text-white w-auto h-10 flex items-center justify-center bg-slate-700
                m-2 rounded" >
                    <span> Admin</span>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <FaTachometerAlt />,
                            label: 'Tổng quan',
                            onClick: () => setCurrentItem('Tổng quan'),
                        },
                        {
                            key: '2',
                            icon: <FaListUl />,
                            label: 'Quản lí đơn hàng',
                            children: [
                                {
                                    key: "9",
                                    icon: <FaListUl />,
                                    label: <Link to="quanlydonhang">Danh sách đơn hàng</Link>,
                                    onClick: () => setCurrentItem('Danh sách đơn hàng')
                                },
                            ],
                        },
                        {
                            key: '3',
                            icon: <FaWarehouse />,
                            label: 'Quản lý slide',
                            children: [
                                {
                                    key: "13",
                                    icon: <FaListUl />,
                                    label: <Link to="themslidepc">Thêm slide pc</Link>,
                                    onClick: () => setCurrentItem('Thêm slide pc')
                                },
                                {
                                    key: "14",
                                    icon: <FaListUl />,
                                    label: <Link to="themslidemobile">Thêm slide mobile</Link>,
                                    onClick: () => setCurrentItem('Thêm slide mobile')
                                },
                                {
                                    key: "15",
                                    icon: <FaListUl />,
                                    label: <Link to="danhsachslide">Danh sách slide</Link>,
                                    onClick: () => setCurrentItem('Danh sách slide')
                                },
                            ],
                        },
                        {
                            key: '4',
                            icon: <FaUserAlt />,
                            label: 'Quản lý tin tức',
                            children: [
                                {
                                    key: "16",
                                    icon: <FaListUl />,
                                    label: <Link to="themtintuc">Thêm tin tức</Link>,
                                    onClick: () => setCurrentItem('Thêm tin tức')
                                },

                                {
                                    key: "17",
                                    icon: <FaListUl />,
                                    label: <Link to="danhsachtintuc">Danh sách tin tức</Link>,
                                    onClick: () => setCurrentItem('Danh sách tin tức')
                                },
                            ],
                        },
                        {
                            key: '5',
                            icon: <FaGift />,
                            label: 'Quản lý chính sách',
                            children: [
                                {
                                    key: "11",
                                    icon: <FaListUl />,
                                    label: <Link to="themchinhsach">Thêm chính sách</Link>,
                                    onClick: () => setCurrentItem('Thêm chính sách')
                                },
                                {
                                    key: "12",
                                    icon: <FaListUl />,
                                    label: <Link to="danhsachchinhsach">Danh sách chính sách</Link>,
                                    onClick: () => setCurrentItem('Danh sách chính sách')
                                },
                            ],
                        },
                        {
                            key: '6',
                            icon: <FaBalanceScale />,
                            label: 'Đối soát',
                            onClick: () => setCurrentItem('Đối soát')
                        },
                        {
                            key: '7',
                            icon: <FaChartLine />,
                            label: 'Báo cáo',
                            onClick: () => setCurrentItem('Báo cáo')
                        },
                        {
                            key: '8',
                            icon: <FaStore />,
                            label: 'Thiết lập gian hàng',
                            onClick: () => setCurrentItem('Thiết lập gian hàng')
                        },



                    ]}
                />
            </Sider>
            <Layout className={`${!collapsed ? 'ml-[200px]' : "ml-[80px]"}`}>
                <Header style={{ padding: 0, background: colorBgContainer, }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <span>{currentItem}</span>

                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,

                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'initial'
                    }}
                >
                    <Routes>
                        <Route path="themslidepc" element={<ThemSlidePC />} />
                        <Route path="themslidemobile" element={<ThemSlideMobile />} />
                        <Route path="danhsachslide" element={<DanhSachSlide />} />

                        <Route path="themtintuc" element={<ThemTinTuc />} />
                        <Route path="danhsachtintuc" element={<DanhSachTinTuc />} />

                        <Route path="quanlydonhang" element={<QuanLyHonHang />} />
                        
                        <Route path="themchinhsach" element={<ThemChinhSach />} />
                        <Route path="danhsachchinhsach" element={<DanhSachChinhSach />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Admin;