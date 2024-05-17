import { useState } from "react";
import { useLocation } from "react-router-dom";

import { AiOutlineClose, AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Nav from 'react-bootstrap/Nav';
import { Avatar, Drawer, MenuProps, } from "antd";
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [

    {
        key: 'sub2',
        label: 'Menu 1',
        icon: <AppstoreOutlined />,
        children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    { key: '7', label: 'Option 7' },
                    { key: '8', label: 'Option 8' },
                ],
            },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'sub4',
        label: 'Navigation Three',
        icon: <SettingOutlined />,
        children: [
            { key: '9', label: 'Option 9' },
            { key: '10', label: 'Option 10' },
            { key: '11', label: 'Option 11' },
            { key: '12', label: 'Option 12' },
        ],
    },
    {
        key: 'grp',
        label: 'Group',
        type: 'group',
        children: [
            { key: '13', label: 'Option 13' },
            { key: '14', label: 'Option 14' },
        ],
    },
];
const MenuBar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    // const [isOpen, setIsOpen] = useState(false);
    // const [isProductOpen, setIsProductOpen] = useState(false);
    const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
        setShow(true);
    };


    const onClose = () => {
        setOpen(false);
    };
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    return (
        <div>
            <div className="h-auto  home-sections z-10 lg:block hidden">
                <div>
                    <ul className="flex flex-row justify-center ">
                        <li
                            className={`li-navbar relative group inline-block custom-menu  ${isHomePage
                                ? "text-[#ff8300] home-sections border-b-2 border-[#ff8300]"
                                : ""
                                }`}
                            // onMouseEnter={() => setIsOpen(true)}
                            // onMouseLeave={() => setIsOpen(false)}
                        >
                            <a href="/">Trang Chủ</a>
                            {/* <div
                                className={`absolute left-0 transform transition duration-200 ease-in-out z-[10] ${isOpen
                                    ? "translate-y-1 opacity-100"
                                    : "translate-y-1/2 opacity-0 invisible"
                                    }`}
                            >
                                <ul className="mt-2 space-y-2 bg-white text-black p-2 rounded-[12px] shadow-lg w-max normal-case">
                                    <li>Nông sản đặc trưng tỉnh Đắk Lắk</li>
                                    <li>Sản phẩm Ocop tỉnh Đắk Lắk</li>
                                    <li>Sản phẩm Ocop 62 tỉnh, thành phố</li>
                                    <li>Danh sách cửa hàng</li>
                                </ul>
                            </div> */}

                            <ul className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute z-20 left-0
                                transition duration-150 ease-in-out origin-top-left min-w-32 z-20` mt-[14px] space-y-2  text-black p-2 shadow-lg w-max normal-case">
                                <li className="rounded-sm  px-3 py-1 hover:bg-gray-100">Nông sản đặc trưng tỉnh Đắk Lắk</li>
                                <li className="rounded-sm  px-3 py-1 hover:bg-gray-100">Sản phẩm Ocop tỉnh Đắk Lắk</li>
                                <li className="rounded-sm  px-3 py-1 hover:bg-gray-100">Sản phẩm Ocop 62 tỉnh, thành phố</li>
                                <li className="rounded-sm  px-3 py-1 hover:bg-gray-100">Danh sách cửa hàng</li>
                                <li className="rounded-sm  px-3 py-1 hover:bg-gray-100">
                                    <button
                                        className="w-full text-left flex items-center outline-none focus:outline-none"
                                    >
                                        <span className="pr-1 flex-1">Thiết bị văn phòng</span>
                                        <span className="mr-auto">
                                            <svg
                                                className="fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                                />
                                            </svg>
                                        </span>
                                    </button>
                                    <ul
                                        className="bg-white border rounded-sm absolute top-0 right-3  transition duration-150 ease-in-out origin-top-left w-max h-full"
                                    >
                                        <li className="px-3 py-1 hover:bg-gray-100">Laptop & PC</li>
                                        <li className="rounded-sm  px-3 py-1 hover:bg-gray-100">
                                            <button
                                                className="w-full text-left flex items-center outline-none focus:outline-none"
                                            >
                                                <span className="pr-1 flex-1">Máy móc văn phòng</span>
                                                <span className="mr-auto">
                                                    <svg
                                                        className="fill-current h-4 w-4 transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                                        />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul
                                                className="bg-white border rounded-sm absolute top-0 right-3 transition duration-150 ease-in-out origin-top-left w-max h-full
      "
                                            >
                                                <li className="px-3 py-1 hover:bg-gray-100">Máy In</li>
                                                <li className="px-3 py-1 hover:bg-gray-100">Máy Photocopy</li>
                                                <li className="px-3 py-1 hover:bg-gray-100">Máy Photocopy</li>
                                                <li className="px-3 py-1 hover:bg-gray-100">Máy Photocopy</li>
                                                <li className="px-3 py-1 hover:bg-gray-100">Máy Photocopy</li>

                                            </ul>
                                        </li>
                                        <li className="px-3 py-1 hover:bg-gray-100">Phụ Kiện Máy Tính</li>
                                        <li className="px-3 py-1 hover:bg-gray-100">Giải Pháp CNTT</li>
                                    </ul>
                                </li>
                            </ul>

                        </li>
                        <li className="li-navbar">Tổng quan</li>
                        <li
                            className="li-navbar relative group inline-block custom-menu "
                            // onMouseEnter={() => setIsProductOpen(true)}
                            // onMouseLeave={() => setIsProductOpen(false)}
                        >
                            Sản phẩm
                          
                                <ul className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute z-20 left-0
                                transition duration-150 ease-in-out origin-top-left min-w-32 z-20` mt-[14px] space-y-2  text-black p-2 shadow-lg w-max normal-case">
                                    <li  className="rounded-sm  px-3 py-1 hover:bg-gray-100" >Sầu riêng</li>
                                    <li  className="rounded-sm  px-3 py-1 hover:bg-gray-100" >Bơ</li>
                                    <li  className="rounded-sm  px-3 py-1 hover:bg-gray-100" >Tiêu</li>
                                    <li  className="rounded-sm  px-3 py-1 hover:bg-gray-100" >Rau củ</li>
                                    <li  className="rounded-sm  px-3 py-1 hover:bg-gray-100" >Cacao</li>
                                    <li  className="rounded-sm  px-3 py-1 hover:bg-gray-100" >Hạt ngũ cốc</li>
                                    <li  className="rounded-sm  px-3 py-1 hover:bg-gray-100" >Phân hữu cơ</li>
                                    <li  className="rounded-sm  px-3 py-1 hover:bg-gray-100" >Phân bón</li>
                                    <li  className="rounded-sm  px-3 py-1 hover:bg-gray-100" >Khác</li>
                                    <li  className="rounded-sm  px-3 py-1 hover:bg-gray-100" >Macca</li>
                                    <li  className="rounded-sm  px-3 py-1 hover:bg-gray-100" >Mít thái</li>
                                </ul>
                           
                        </li>
                        <li className="li-navbar">Dành cho người mua</li>
                        <li className="li-navbar">Dành cho người bán</li>
                        <li className="li-navbar">Thông tin thị trường</li>
                        <li className="li-navbar">Mời liên kết sản xuất - kinh doanh</li>
                     

                    </ul>
                </div>
            </div>

            {/* menu rps */}
            <div className="flex flex-row lg:hidden">
                <div className="flex  h-auto overflow-x-auto  ">
                    <ul className="flex flex-row space-x-4 whitespace-nowrap items-center justify-center uppercase text-[14px] font-medium ">
                        <li
                            className={` ${isHomePage
                                ? " text-[#ff8300]"
                                : "text-white"
                                }`}>Trang chủ</li>
                        <li className="hover:text-[#ff8300]">Sản phẩm</li>
                        <li className="hover:text-[#ff8300]">Mời liên kết sản xuất - kinh doanh</li>
                        <li className="hover:text-[#ff8300]">Câu chuyện sản xuất</li>
                        <li className="hover:text-[#ff8300]">Nông sản mùa vụ</li>
                        <li className="hover:text-[#ff8300]">Thông tin thị trường</li>
                    </ul>
                </div>
                <button className="w-[60px] text-[30px] pl-2" onClick={showDrawer}>
                    {show ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
                </button>
            </div>

            {/* mobile nav */}
            <Drawer
                placement="left"
                width='90%'
                onClose={onClose}
                closable={false}
                open={open}
            >
                <p className="site-description-item-profile-p " style={{ marginBottom: 24 }}>
                    <div className="flex justify-between w-full items-center  ">
                        <div className="flex items-center">
                            <Avatar className="mr-2" >
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="user" width="24px" height="24px" fill="currentColor" aria-hidden="true"><path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg>
                            </Avatar>
                            <div>
                                <a href="#" className="text-blue-700">Đăng nhập</a> | <a href="#" className="text-blue-700">Đăng ký</a>
                            </div>
                        </div>
                        <div>
                            <AiOutlineClose size={25} onClick={onClose} className="cursor-pointer" />
                        </div>
                    </div>

                </p>
                <Menu
                    onClick={onClick}
                    style={{ width: '100%' }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
            </Drawer>
        </div>
    );
};

export default MenuBar;