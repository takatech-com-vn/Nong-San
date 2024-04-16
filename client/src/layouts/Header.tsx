import React, { useEffect, useState } from "react";

import ColLeft from "./components/colLeft";
import ColCenter from "./components/colCenter";
import ColRight from "./components/colRight";
import { RiMenu2Line } from "react-icons/ri";
import { CiCircleAlert, CiLogin, CiUser } from "react-icons/ci";

const Header = () => {
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
          className={`absolute z-50 left-0 transform transition duration-200 ease-in-out ${
            isOpen
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
          <a href="" className="flex justify-center items-center"><CiCircleAlert className="text-[20px] mr-1"/> Hỗ trợ</a>
          <a href="/register" className="flex justify-center items-center"> <CiUser className="text-[20px] mr-1"/>  Đăng ký</a>
          <a href="/login" className="flex justify-center items-center"><CiLogin className="text-[20px] mr-1"/> Đăng nhập</a>
        </div>
      </div>
      <div
        className={` ${isScrolled ? "fixed top-[0] left-0 right-0 z-50" : ""} bg-white`}
      >
        <div className="wrapper">
          <nav className="w-full h-[203.65px] bg-white">
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
