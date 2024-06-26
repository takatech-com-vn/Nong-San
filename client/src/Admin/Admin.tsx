import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
import { Affix, Avatar, Button, Dropdown, Layout, Menu, MenuProps, Tooltip, theme } from 'antd';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { FaBalanceScale, FaChartLine, FaGift, FaListUl, FaStore, FaTachometerAlt, FaUserAlt, FaWarehouse } from 'react-icons/fa';
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
import QuanLySanPham from './Pages/QuanLySanPham';
import ThemPhanLoai from './Pages/QuanLyPhanLoai/ThemPhanLoai';
import DanhSachPhanLoai from './Pages/QuanLyPhanLoai/DanhSachPhanLoai';
import Themhangsx from './Pages/QuanLyPhanLoai/Themhangsx';
import DanhSachHangsx from './Pages/QuanLyPhanLoai/DanhSachHangsx';
import ThemPhanLoaiChinh from './Pages/QuanLyPhanLoai/ThemPhanLoaiChinh';
import DanhSachPhanLoaiChinh from './Pages/QuanLyPhanLoai/DanhSachPhanLoaiChinh';
import { GoHome } from 'react-icons/go';
import { UserOutlined } from '@ant-design/icons';
import { IoIosLogOut } from 'react-icons/io';
import TongQuan from './Pages/TongQuan/TongQuan';

const { Header, Sider, Content } = Layout;


const items: MenuProps['items'] = [
    {
        key: '0',
        label: <a href="#">Tài khoản của tôi</a>,
        icon: <UserOutlined />,
    },
    {
        type: 'divider',
    },
    {
        key: '1',
        label: <a href="#">Đăng xuất</a>,
        icon: <IoIosLogOut size={20} />
    },


];

const Admin: React.FC = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [top, setTop] = React.useState<number>(0);
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
                    style={{ height: '100%', overflow: 'auto', paddingBottom: '60px' }}
                    className='custom-scrollbar'
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <FaTachometerAlt />,
                            label: <Link to="*">Tổng quan</Link>,
                            onClick: () => setCurrentItem('Tổng quan'),
                        },
                        {
                            key: '2',
                            icon: <FaListUl />,
                            label: 'Quản lí Sản phẩm',
                            children: [
                                {
                                    key: "9",
                                    icon: <FaListUl />,
                                    label: <Link to="quanlysanpham">Danh sách sản phẩm</Link>,
                                    onClick: () => setCurrentItem('Danh sách sản phẩm')
                                },
                            ],
                        },

                        {
                            key: '42',
                            icon: <FaListUl />,
                            label: 'Quản lí phân loại',
                            children: [
                                {
                                    key: "43",
                                    icon: <FaListUl />,
                                    label: <Link to="themphanloaichinh">Thêm phân loại chính</Link>,
                                    onClick: () => setCurrentItem('Thêm phân loại chính')
                                },

                                {
                                    key: "44",
                                    icon: <FaListUl />,
                                    label: <Link to="danhsachphanloaichinh">Danh sách phân loại chính</Link>,
                                    onClick: () => setCurrentItem('Danh sách phân loại chính')
                                },

                                {
                                    key: "10",
                                    icon: <FaListUl />,
                                    label: <Link to="themphanloai">Thêm phân loại</Link>,
                                    onClick: () => setCurrentItem('Thêm phân loại')
                                },

                                {
                                    key: "12",
                                    icon: <FaListUl />,
                                    label: <Link to="danhsachphanloai">Danh sách phân loại</Link>,
                                    onClick: () => setCurrentItem('Danh sách phân loại')
                                },

                                {
                                    key: "39",
                                    icon: <FaListUl />,
                                    label: <Link to="themhangsanxuat">Thêm hãng sản xuất</Link>,
                                    onClick: () => setCurrentItem('Thêm hãng sản xuất')
                                },

                                {
                                    key: "40",
                                    icon: <FaListUl />,
                                    label: <Link to="danhsachhangsx">Danh sách hãng sản xuất</Link>,
                                    onClick: () => setCurrentItem('Danh sách hãng sản xuất')
                                },
                            ],
                        },

                        {
                            key: '3',
                            icon: <FaWarehouse />,
                            label: 'Quản lý slide',
                            children: [
                                {
                                    key: "14",
                                    icon: <FaListUl />,
                                    label: <Link to="themslidepc">Thêm slide pc</Link>,
                                    onClick: () => setCurrentItem('Thêm slide pc')
                                },
                                {
                                    key: "15",
                                    icon: <FaListUl />,
                                    label: <Link to="themslidemobile">Thêm slide mobile</Link>,
                                    onClick: () => setCurrentItem('Thêm slide mobile')
                                },
                                {
                                    key: "16",
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
                                    key: "17",
                                    icon: <FaListUl />,
                                    label: <Link to="themtintuc">Thêm tin tức</Link>,
                                    onClick: () => setCurrentItem('Thêm tin tức')
                                },

                                {
                                    key: "18",
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
                                    key: "19",
                                    icon: <FaListUl />,
                                    label: <Link to="themchinhsach">Thêm chính sách</Link>,
                                    onClick: () => setCurrentItem('Thêm chính sách')
                                },
                                {
                                    key: "20",
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
                <Affix offsetTop={top}>
                    <Header style={{ padding: 0, background: colorBgContainer, }} className='border-b'>
                        <div className='flex flex-row justify-between'>
                            <div>
                                <Button
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 40,
                                    }}
                                />
                                <span>{currentItem}</span>
                            </div>
                            <div className='mr-5 flex flex-row items-center gap-2'>

                                <Tooltip title="Trang chủ">
                                    <button>
                                        <Link to="/">
                                            <GoHome size={20} />
                                        </Link>
                                    </button>
                                </Tooltip>
                                <Dropdown menu={{ items }} trigger={['hover']}>
                                    <Avatar icon={<UserOutlined />} />
                                </Dropdown>
                            </div>
                        </div>


                    </Header>
                </Affix>
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
                        <Route path="*" element={<TongQuan />} />
                        <Route path="themslidepc" element={<ThemSlidePC />} />
                        <Route path="themslidemobile" element={<ThemSlideMobile />} />
                        <Route path="danhsachslide" element={<DanhSachSlide />} />

                        <Route path="themtintuc" element={<ThemTinTuc />} />
                        <Route path="danhsachtintuc" element={<DanhSachTinTuc />} />

                        <Route path="quanlysanpham" element={<QuanLySanPham />} />

                        <Route path="themphanloaichinh" element={<ThemPhanLoaiChinh />} />
                        <Route path="themphanloai" element={<ThemPhanLoai />} />
                        <Route path="themhangsanxuat" element={<Themhangsx />} />
                        <Route path="danhsachphanloaichinh" element={<DanhSachPhanLoaiChinh />} />
                        <Route path="danhsachphanloai" element={<DanhSachPhanLoai />} />
                        <Route path="danhsachhangsx" element={<DanhSachHangsx />} />

                        <Route path="themchinhsach" element={<ThemChinhSach />} />
                        <Route path="danhsachchinhsach" element={<DanhSachChinhSach />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Admin;