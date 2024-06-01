import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
import { Affix, Avatar, Button, Dropdown, Layout, Menu, Tooltip, theme } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import { FaBalanceScale, FaChartLine, FaGift, FaListUl, FaStore, FaTachometerAlt, FaUserAlt, FaWarehouse } from 'react-icons/fa';
import QuanLyHonHang from './Pages/Quanlydonhang/QuanLyHonHang';
import Sanpham from './Pages/Quanlykhohang/Sanpham';
import Khohang from './Pages/Quanlykhohang/Khohang';
import { useNavigate, } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Loader from '../components/Loader/Loader';
import AddProduct from './Pages/Quanlykhohang/AddProduct';
import { UserOutlined } from '@ant-design/icons';
import { GoHome } from 'react-icons/go';
// import axios from 'axios';
// import { setUser } from '../redux/useSlice';
const { Header, Sider, Content } = Layout;
import type { MenuProps } from 'antd';
import { IoIosLogOut } from 'react-icons/io';
import TongQuan from './Pages/TongQuan/TongQuan';

const items: MenuProps['items'] = [
    {
        key: '0',
        label: <a href="/profile">Tài khoản của tôi</a>,
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
const Brands: React.FC = () => {
    //   const dispatch = useDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [top, setTop] = React.useState<number>(0);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const user = useSelector((state: RootState) => state.user.user);
    console.log('brands', user)
    useEffect(() => {
        if (user) {
            // Kiểm tra role của người dùng
            if (user.role === 'Brand') {
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
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh', position: 'fixed', }}
            >
                <div className="text-white w-auto h-10 flex items-center justify-center bg-slate-700
                m-2 rounded" >
                    <span>  Brand Name</span>
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
                            label: 'Quản lí đơn hàng',
                            children: [
                                {
                                    key: "9",
                                    icon: <FaListUl />,
                                    label: <Link to="quanlydonhang">Danh sách đơn hàng</Link>,
                                    onClick: () => setCurrentItem('Danh sách đơn hàng'),
                                },
                            ],
                        },
                        {
                            key: '3',
                            icon: <FaWarehouse />,
                            label: 'Quản lý kho hàng',
                            children: [
                                {
                                    key: "10",
                                    icon: <FaListUl />,
                                    label: <Link to="sanpham">Sản phẩm</Link>,
                                    onClick: () => setCurrentItem('Sản phẩm'),
                                },

                                {
                                    key: "11",
                                    icon: <FaListUl />,
                                    label: <Link to="themsanpham">Thêm sản phẩm</Link>,
                                    onClick: () => setCurrentItem('Thêm sản phẩm'),
                                },

                                {
                                    key: "12",
                                    icon: <FaListUl />,
                                    label: <Link to="khohang">Kho hàng</Link>,
                                    onClick: () => setCurrentItem('Kho hàng'),
                                },
                            ],
                        },
                        {
                            key: '4',
                            icon: <FaUserAlt />,
                            label: 'Quản lý khách hàng',
                            onClick: () => setCurrentItem('Quản lý khách hàng'),
                        },
                        {
                            key: '5',
                            icon: <FaGift />,
                            label: 'Quản lý khuyến mãi',
                            onClick: () => setCurrentItem('Quản lý khuyến mãi'),
                        },
                        {
                            key: '6',
                            icon: <FaBalanceScale />,
                            label: 'Đối soát',
                            onClick: () => setCurrentItem('Đối soát'),
                        },
                        {
                            key: '7',
                            icon: <FaChartLine />,
                            label: 'Báo cáo',
                            children: [
                                {
                                    key: "13",
                                    icon: <FaListUl />,
                                    label: <Link to="baocaodoanhthu">Doanh thu</Link>,
                                    onClick: () => setCurrentItem('Doanh thu'),
                                },

                                {
                                    key: "14",
                                    icon: <FaListUl />,
                                    label: <Link to="baocaokhohang">Kho hàng</Link>,
                                    onClick: () => setCurrentItem('Kho hàng'),
                                },

                                {
                                    key: "15",
                                    icon: <FaListUl />,
                                    label: <Link to="baocaobanhang">Bán hàng</Link>,
                                    onClick: () => setCurrentItem('Bán hàng'),
                                },

                                {
                                    key: "16",
                                    icon: <FaListUl />,
                                    label: <Link to="baocaosanpham">Sản phẩm</Link>,
                                    onClick: () => setCurrentItem('Sản phẩm'),
                                },

                                {
                                    key: "17",
                                    icon: <FaListUl />,
                                    label: <Link to="baocaovanchuyen">Vận chuyển</Link>,
                                    onClick: () => setCurrentItem('Vận chuyển'),
                                },

                                {
                                    key: "18",
                                    icon: <FaListUl />,
                                    label: <Link to="baocaokhachhang">Khách hàng</Link>,
                                    onClick: () => setCurrentItem('Khách hàng'),
                                },
                            ],
                        },
                        {
                            key: '8',
                            icon: <FaStore />,
                            label: 'Thiết lập gian hàng',
                            onClick: () => setCurrentItem('Thiết lập gian hàng'),
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
                        // margin: '24px 16px',
                        // padding: 24,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'initial'
                    }}
                >
                    <Routes>
                        <Route path="*" element={<TongQuan />} />
                        <Route path="quanlydonhang" element={<QuanLyHonHang />} />
                        <Route path="sanpham" element={<Sanpham />} />
                        <Route path="themsanpham" element={<AddProduct />} />
                        <Route path="khohang" element={<Khohang />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Brands;