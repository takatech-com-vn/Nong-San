import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ColLeft from "./components/colLeft";
import ColCenter from "./components/colCenter";
import ColRight from "./components/colRight";
import { RiMenu2Line } from "react-icons/ri";
import { CiCircleAlert, CiLogin, CiUser } from "react-icons/ci";
import { HiOutlineBellAlert, HiOutlineShoppingBag } from "react-icons/hi2";
import { Dropdown } from 'react-bootstrap';
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";

import { logout } from "../redux/useSlice";
const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  console.log('cc', user)
  const [isScrolled, setIsScrolled] = useState(false);
  const checkScroll = () => {
    if (window.pageYOffset > 1) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("expiryTime");
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");
    dispatch(logout());
  };



  return (
    <header className=" h-auto bg-white md:px-5 w-full z-50 mb-3">
      <div className="wrapper w-full h-[46.8px] flex flex-row justify-between items-center text-[14px] border-b border-gray-300">
        <div className="relative">
          <div className="md:flex flex-row gap-4 hidden">
            <a href="">Kênh người bán</a>
            <a href="">Tin tức</a>
            <a href="">Tải ứng dụng</a>
          </div>
          <button onClick={toggleMenu} className="md:hidden text-[20px]">
            <RiMenu2Line />
          </button>
          {isOpen && (
            <div
              className={`absolute z-50 left-0 transform transition duration-200 ease-in-out ${isOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0 invisible"
                }`}
            >
              <ul className="mt-2 space-y-2 bg-white text-black p-2 rounded-[12px] shadow-lg w-max normal-case flex flex-col">
                <a href="">Kênh người bán</a>
                <a href="">Tin tức</a>
                <a href="">Tải ứng dụng</a>
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-4 text-[14px]">
          {user?.username ? (
            <>
              <a href="" className="flex justify-center items-center"><HiOutlineBellAlert className="text-[20px] mr-1" />Thông báo</a>
              <a href="" className="flex justify-center items-center"> <CiCircleAlert className="text-[20px] mr-1" />Hỗ trợ</a>
              <Dropdown>
                <Dropdown.Toggle as="a" className="flex justify-center items-center" id="dropdown-basic">
                  <CiUser className="text-[20px] mr-1" />{user.username}
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-[200px]">
                  <Dropdown.Item href="#/action-1">
                    <div className="flex items-center">
                      <CiUser />
                      <span>Trang cá nhân</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    <div className="flex items-center">
                      <PiShoppingCartSimpleLight />
                      <span>Đơn hàng của tôi</span>
                    </div>
                  </Dropdown.Item>
                  {user.role === 'Customer' && (
                    <Dropdown.Item href="/EStore-register">
                      <div className="flex items-center">
                        <HiOutlineShoppingBag />
                        <span>Trở thành người bán</span>
                      </div>
                    </Dropdown.Item>
                  )}
                  <Dropdown>
                    {user.role === 'Admin' && (
                      <Dropdown.Item href="/admin">
                        <div className="flex items-center">
                          <HiOutlineShoppingBag />
                          <span>Admin</span>
                        </div>
                      </Dropdown.Item>
                    )}
                    {user.role === 'Brand' && (
                      <Dropdown.Item href="/brands">
                        <div className="flex items-center">
                          <HiOutlineShoppingBag />
                          <span>Brand</span>
                        </div>
                      </Dropdown.Item>
                    )}
                  </Dropdown>
                  <Dropdown.Item onClick={handleLogout}>
                    <div className="flex items-center">
                      <IoIosLogOut />
                      <span>Đăng xuất</span>
                    </div>
                  </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>

            </>
          ) : (
            <>
              <a href="" className="flex justify-center items-center"><CiCircleAlert className="text-[20px] mr-1" /> Hỗ trợ</a>
              <a href="/register" className="flex justify-center items-center"> <CiUser className="text-[20px] mr-1" />  Đăng ký</a>
              <a href="/login" className="flex justify-center items-center"><CiLogin className="text-[20px] mr-1" /> Đăng nhập</a>
            </>
          )}
        </div>
      </div>
      <div
        className={` ${isScrolled ? "fixed top-[0] left-0 right-0 z-50" : ""} bg-white`}
      >
        <div className="wrapper">
          <nav className="w-full h-[203.65px] bg-white mt-2">
            <div className="flex flex-row gap-[25px] border-b border-gray-300 py-[0px] md:py-[24px] justify-between md:justify-normal">
              <ColLeft></ColLeft>
              <span className=" hidden md:flex">
                <ColCenter></ColCenter>
              </span>
              <ColRight></ColRight>
            </div>
            <div className="md:hidden">
              <ColCenter></ColCenter>
            </div>

            <div className="w-full h-[46.8px] flex flex-row justify-between items-center text-[14px] border-y md:border-b md:border-t-0
             border-gray-300 bg-white">
              <div className="flex flex-row gap-4">
                <a href="">Tìm kiếm hàng đầu:</a>
                <a href="">Trái cây</a>
                <a href="">Sản phẩm</a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
