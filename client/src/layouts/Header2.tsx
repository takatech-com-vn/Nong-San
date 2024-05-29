import { Dropdown, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { CiUser } from 'react-icons/ci';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { IoIosLogOut } from 'react-icons/io';
import axios from 'axios';
import { logout } from '../redux/useSlice';
import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;
// import { SearchOutlined } from '@ant-design/icons';
import logo from "../../public/TAKAPOS+SB-01.png";
import MenuBar from '../pages/Home/components/Menu';



const Header2 = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    const [searchType, setSearchType] = useState('product');

    const handleChange = (value: React.SetStateAction<string>) => {
        setSearchType(value);
    };
    const handleLogout = () => {
        axios.get(`${import.meta.env.VITE_APP_API_URL}/login/logout`, {
            withCredentials: true
        })
            .then(response => {
                console.log(response.data.message); // "Logged out"
                localStorage.removeItem("data");
                localStorage.removeItem("expiryTime");
                localStorage.removeItem("token");
                localStorage.removeItem("isLogin");
                dispatch(logout());
            })
            .catch(error => {
                console.error("Error logging out", error);
            });
    };

    return (
        <>
            <header className=" fixed top-0 left-0 right-0 z-10  bg-[#1c4280] justify-center items-center p-2 w-full">
                <div className="wrapper flex flex-row w-full justify-between items-center">
                    <div className='flex flex-row  justify-between items-center'>
                        {/* <!-- logo --> */}
                        <div className="md:w-48">
                            <a href="/">
                                <img className="h-8 md:h-10" src={logo} alt=""></img>
                            </a>
                        </div>
                        {/* <div className="mr-auto md:w-48 flex-shrink-0">
                            <img className="h-8 md:h-10" src={logo} alt=""></img>
                        </div> */}
                        {/* <!-- search --> */}
                        <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden xl:flex items-center mr-auto">
                            {/* <select className="bg-transparent uppercase font-bold text-sm p-4 mr-4" name="" id="">
                            <option>all categories</option>
                        </select> */}
                            <Select
                                defaultValue="product"
                                value={searchType}
                                onChange={handleChange}
                                className="min-w-[100px] bg-transparent uppercase font-bold text-sm p-3 mr-4"
                                variant="borderless"
                            >
                                <Option value="product">Sản phẩm</Option>
                                <Option value="offer">Thư chào hàng</Option>
                                <Option value="quote">Yêu cầu báo giá</Option>
                                <Option value="company">Doanh nghiệp</Option>
                                <Option value="association">Hội / Hiệp hội</Option>
                                <Option value="industrial_zone">KCN / KCX / CCN</Option>
                                <Option value="user">Người dùng</Option>
                            </Select>
                            <input className="border-l border-gray-300 bg-transparent font-semibold text-sm pl-4" type="text" placeholder="Nhập từ khóa tim kiếm ..."></input>
                            <svg className="ml-auto h-5 px-4 text-[#0055aa]" aria-hidden="true" focusable="false" data-prefix="far" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"></path></svg>
                        </div>
                    </div>

                    {/* 
                    <!-- buttons --> */}
                    <nav className="contents ">
                        <ul className="ml-4  flex items-center">
                            {user?.username ? (
                                <li className="ml-2 lg:ml-4 relative inline-block">
                                    <Dropdown
                                        trigger={['hover']}
                                        overlay={
                                            <Menu className="w-[200px]">
                                                <Menu.Item>
                                                    <div className='justify-center flex text-[#f36f25]'>
                                                        <span>Xin chào {user.username}</span>
                                                    </div>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <a className="flex items-center" href='/profile'>
                                                        <CiUser />
                                                        <span>Trang cá nhân</span>
                                                    </a>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <div className="flex items-center">
                                                        <PiShoppingCartSimpleLight />
                                                        <span>Đơn hàng của tôi</span>
                                                    </div>
                                                </Menu.Item>
                                                {user.role === 'Customer' && (
                                                    <Menu.Item>
                                                        <a className="flex items-center" href='/EStore-register'>
                                                            <HiOutlineShoppingBag />
                                                            <span>Trở thành người bán</span>
                                                        </a>
                                                    </Menu.Item>
                                                )}
                                                {user.role === 'Admin' && (
                                                    <Menu.Item>
                                                        <a className="flex items-center" href='/admin'>
                                                            <HiOutlineShoppingBag />
                                                            <span>Admin</span>
                                                        </a>
                                                    </Menu.Item>
                                                )}
                                                {user.role === 'Brand' && (
                                                    <Menu.Item>
                                                        <a className="flex items-center" href='/brands'>
                                                            <HiOutlineShoppingBag />
                                                            <span>Brand</span>
                                                        </a>
                                                    </Menu.Item>
                                                )}
                                                <Menu.Item onClick={handleLogout}>
                                                    <div className="flex items-center">
                                                        <IoIosLogOut />
                                                        <span>Đăng xuất</span>
                                                    </div>
                                                </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <svg
                                            className="h-9 lg:h-10 p-2 text-white"
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="far"
                                            data-icon="user"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
                                            ></path>
                                        </svg>
                                    </Dropdown>
                                </li>
                            ) : (
                                <div className='flex flex-row items-center  gap-2 text-white'>
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="user" width="24px" height="24px" fill="currentColor" aria-hidden="true"><path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg>
                                    <div className='flex flex-col text-[13px] gap-2 '>
                                        <a href="/login">Đăng nhập</a>
                                        <a href="/register">Đăng ký</a>
                                    </div>
                                </div>
                            )}
                            <li className="ml-2 lg:ml-4 relative inline-block">
                                <a className="" href="">
                                    <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">2</div>
                                    <svg className="h-9 lg:h-10 p-2 text-white" viewBox="64 64 896 896" focusable="false" data-icon="bell" fill="currentColor" aria-hidden="true"><path d="M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z"></path></svg>
                                </a>
                            </li>
                            <li className="ml-2 lg:ml-4 relative inline-block">
                                <a className="" href="">
                                    <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">3</div>
                                    <svg className="h-9 lg:h-10 p-2 text-white" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg>
                                </a>
                            </li>
                            <li className="ml-2 lg:ml-4 relative inline-block">
                                <a className="" href="">
                                    <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">12</div>
                                    <svg className="h-9 lg:h-10 p-2 text-white" aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"></path></svg>
                                </a>
                            </li>

                            {/* <div className='hidden lg:flex flex-row  items-center gap-4 text-white justify-end'>
                                <div className='flex flex-col items-center justify-center '>
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="bell" width="24px" height="24px" fill="currentColor" aria-hidden="true"><path d="M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z"></path></svg>
                                    <a href="" className='text-[13px]'>Thông báo</a>
                                </div>
                                <div className='flex flex-col items-center justify-center '>
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="read" width="24px" height="24px" fill="currentColor" aria-hidden="true"><path d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 00324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32zM324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3 6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39zm563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5 48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888v488zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5zM396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5z"></path></svg>
                                    <a href="" className='text-[13px]'>Tin tức</a>
                                </div> <div className='flex flex-col items-center justify-center '>
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="schedule" width="24px" height="24px" fill="currentColor" aria-hidden="true"><path d="M928 224H768v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H548v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H328v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H96c-17.7 0-32 14.3-32 32v576c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V256c0-17.7-14.3-32-32-32zm-40 568H136V296h120v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h120v496zM416 496H232c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0 136H232c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm308.2-177.4L620.6 598.3l-52.8-73.1c-3-4.2-7.8-6.6-12.9-6.6H500c-6.5 0-10.3 7.4-6.5 12.7l114.1 158.2a15.9 15.9 0 0025.8 0l165-228.7c3.8-5.3 0-12.7-6.5-12.7H737c-5-.1-9.8 2.4-12.8 6.5z"></path></svg>
                                    <a href="" className='text-[13px]'>Công việc</a>
                                </div> <div className='flex flex-col items-center justify-center '>
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="question-circle" width="24px" height="24px" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg>
                                    <a href="" className='text-[13px]'>Trợ giúp</a>
                                </div>
                            </div> */}
                        </ul>
                    </nav>
                </div>

                {/* <hr/> */}
            </header>
            <div className='mt-[56px] z-[10] px-3 lg:px-0  bg-white'>
                <MenuBar />
            </div>
        </>


    );
};

export default Header2;