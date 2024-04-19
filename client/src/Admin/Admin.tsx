import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import { FaBalanceScale, FaChartLine, FaGift, FaListUl, FaStore, FaTachometerAlt, FaUserAlt, FaWarehouse } from 'react-icons/fa';
import QuanLyHonHang from './Pages/QuanLyHonHang';

const { Header, Sider, Content } = Layout;

const Admin: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [currentItem, setCurrentItem] = useState('');
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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
                            label: 'Quản lý kho hàng',
                            onClick: () => setCurrentItem('Quản lý kho hàng')
                        },
                        {
                            key: '4',
                            icon: <FaUserAlt />,
                            label: 'Quản lý khách hàng',
                             onClick: () => setCurrentItem('Quản lý khách hàng')
                        },
                        {
                            key: '5',
                            icon: <FaGift />,
                            label: 'Quản lý khuyến mãi',
                             onClick: () => setCurrentItem('Quản lý khuyến mãi')
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
                        <Route path="quanlydonhang" element={<QuanLyHonHang />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Admin;