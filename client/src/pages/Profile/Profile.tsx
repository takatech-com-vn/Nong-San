import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import avataProfile from '../../assets/avataProfile.svg';
import { FaBell, FaUser } from 'react-icons/fa';
import { NavLink, Route, Routes } from 'react-router-dom';
import { BsClipboard2MinusFill, BsFillKeyFill, BsPersonCircle } from 'react-icons/bs';
import Account from './components/Account';
import Notification from './components/Notification';
import Order from './components/Order';
import Address from './components/Address';
import Viewedproducts from './components/Viewedproducts';
import Paymentcard from './components/Paymentcard';
import { IoEye, IoLogOut } from 'react-icons/io5';
import { MdCreditCard } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { Modal } from 'antd';
import { useState } from 'react';
import ChangePassword from './Modal/ChangePassword';

const Profile: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleChangePassword = () => {
        setIsModalOpen(true);
    }
    return (
        <>
            <div className='wrapper mt-1'>
                <div className='flex flex-col relative'>
                    <div className='h-auto w-full bg-blue-300'>
                        <img className='w-full object-cover h-[240px] ' src="https://www.takatech.com.vn/img/background-img/about-page-title-bg.jpg" alt="" />
                    </div>
                    <div className='flex h-[50px] w-full bg-white items-center'>
                        <div className='rounded-full bg-red-200 w-[100px] h-[100px] absolute left-8 bottom-0'>
                            <img className='w-full h-full object-cover rounded-full' src={avataProfile} alt="" />
                        </div>
                        <h1 className='ml-[150px] font-medium'>{user?.username}</h1>
                    </div>
                </div>
                {/* ---------------- */}
                <div className="">
                    <div className="flex flex-row pt-3 pb-4">
                        <div className="w-2/12 mr-6">
                            <div className="sticky top-16">
                                <div className="bg-white rounded-xl shadow-lg mb-3 p-3 text-sm">
                                    <h1 className='flex items-center gap-2 font-bold py-2'><BsPersonCircle />Quản lý tài khoản</h1>
                                    <NavLink to="account" className={({ isActive }) =>
                                        `${isActive ? "text-[#ff8300] font-semibold" : ""} flex items-center gap-2 p-2 w-full hover:text-[#ff8300] transition-all duration-300 ease-in-out`}>
                                        <FaUser /> <span className="">Thông tin tài khoản</span>
                                    </NavLink>

                                    <NavLink to="paymentcard" className={({ isActive }) =>
                                        `${isActive ? "text-[#ff8300] font-semibold" : ""} flex items-center gap-2 p-2 w-full hover:text-[#ff8300] transition-all duration-300 ease-in-out`}>
                                        <MdCreditCard /> <span className="">Thông tin thanh toán</span>
                                    </NavLink>

                                    <NavLink to="address" className={({ isActive }) =>
                                        `${isActive ? "text-[#ff8300] font-semibold" : ""} flex items-center gap-2 p-2 w-full hover:text-[#ff8300] transition-all duration-300 ease-in-out`}>
                                        <FaLocationDot /> <span className="">Sổ địa chỉ</span>
                                    </NavLink>

                                    <button className="flex items-center gap-2 p-2 w-full hover:text-[#ff8300] transition-all duration-300 ease-in-out"
                                        onClick={() => handleChangePassword()}
                                    >
                                        <BsFillKeyFill /><span className="">Đổi mật khẩu</span>
                                    </button>

                                    <a href="" className="flex items-center gap-2  p-2 w-full hover:text-[#ff8300] transition-all duration-300 ease-in-out">
                                        <IoLogOut /> <span className="">Đăng Xuất</span>
                                    </a>
                                </div>
                                <div className="bg-white rounded-xl shadow-lg mb-3 p-3 text-sm">
                                    <h1 className='flex items-center gap-2 font-bold py-2'><BsClipboard2MinusFill />Quản lý đơn hàng</h1>
                                    <NavLink to="order" className={({ isActive }) =>
                                        `${isActive ? "text-[#ff8300] font-semibold" : ""} flex items-center gap-2 p-2 w-full hover:text-[#ff8300] transition-all duration-300 ease-in-out`}>

                                        <BsClipboard2MinusFill /> <span className="">Quản lý đơn hàng</span>
                                    </NavLink>

                                    <NavLink to="notification" className={({ isActive }) =>
                                        `${isActive ? "text-[#ff8300] font-semibold" : ""} flex items-center gap-2 p-2 w-full hover:text-[#ff8300] transition-all duration-300 ease-in-out`}>
                                        <FaBell /> <span className="">Thông báo của tôi</span>
                                    </NavLink>

                                    <NavLink to="viewedproducts" className={({ isActive }) =>
                                        `${isActive ? "text-[#ff8300] font-semibold" : ""} flex items-center gap-2 p-2 w-full hover:text-[#ff8300] transition-all duration-300 ease-in-out`}>
                                        <IoEye /> <span className="">Sản phẩm đã xem</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="w-10/12 bg-slate-200">
                            <Routes>
                                <Route path="*" element={<Account />} />
                                <Route path="notification" element={<Notification />} />
                                <Route path="order" element={<Order />} />
                                <Route path="address" element={<Address />} />
                                <Route path="paymentcard" element={<Paymentcard />} />
                                <Route path="viewedproducts" element={<Viewedproducts />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Đổi mật khẩu"
                centered
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={false}

            >
                <ChangePassword setModal={setIsModalOpen}/>
            </Modal>
        </>

    );
};

export default Profile;