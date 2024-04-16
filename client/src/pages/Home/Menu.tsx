import { useState } from "react";
import { useLocation } from "react-router-dom";

import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import 'bootstrap/dist/css/bootstrap.min.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

const Menu = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const [isOpen, setIsOpen] = useState(false);
    const [isProductOpen, setIsProductOpen] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <div className="h-auto  bg-[#008000] z-10 md:block hidden">
                <div>
                    <ul className="flex flex-row justify-center">
                        <li
                            className={`li-navbar relative group ${isHomePage
                                ? "text-white bg-[#006700] border-b-2 border-white"
                                : ""
                                }`}
                            onMouseEnter={() => setIsOpen(true)}
                            onMouseLeave={() => setIsOpen(false)}
                        >
                            <a href="/">Trang Chủ</a>
                            <div
                                className={`absolute left-0 transform transition duration-200 ease-in-out ${isOpen
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
                            </div>
                        </li>
                        <li
                            className="li-navbar relative group"
                            onMouseEnter={() => setIsProductOpen(true)}
                            onMouseLeave={() => setIsProductOpen(false)}
                        >
                            Sản phẩm
                            <div
                                className={`absolute left-0 transform transition duration-200 ease-in-out ${isProductOpen
                                    ? "translate-y-1 opacity-100"
                                    : "translate-y-1/2 opacity-0 invisible"
                                    }`}
                            >
                                <ul className="mt-2 space-y-2 bg-white text-black p-2 rounded-[12px] shadow-lg w-max normal-case">
                                    <li>Sầu riêng</li>
                                    <li>Bơ</li>
                                    <li>Tiêu</li>
                                    <li>Rau củ</li>
                                    <li>Cacao</li>
                                    <li>Hạt ngũ cốc</li>
                                    <li>Phân hữu cơ</li>
                                    <li>Phân bón</li>
                                    <li>Khác</li>
                                    <li>Macca</li>
                                    <li>Mít thái</li>
                                </ul>
                            </div>
                        </li>
                        <li className="li-navbar">Mời liên kết sản xuất - kinh doanh</li>
                        <li className="li-navbar">Câu truyện sản phẩm</li>
                        <li className="li-navbar">Nông sản mùa vụ</li>
                        <li className="li-navbar">Thông tin thị trường</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-row md:hidden">
                <div className="flex  h-[50px] overflow-x-auto  ">
                    <ul className="flex flex-row space-x-4 whitespace-nowrap items-center justify-center uppercase text-[14px] font-medium ">
                        <li
                            className={` ${isHomePage
                                ? " text-[#006700]"
                                : "text-white"
                                }`}>Trang chủ</li>
                        <li className="hover:text-[#006700]">Sản phẩm</li>
                        <li className="hover:text-[#006700]">Mời liên kết sản xuất - kinh doanh</li>
                        <li className="hover:text-[#006700]">Câu chuyện sản xuất</li>
                        <li className="hover:text-[#006700]">Nông sản mùa vụ</li>
                        <li className="hover:text-[#006700]">Thông tin thị trường</li>
                    </ul>
                </div>
                <button className="w-[60px] text-[50px] pl-2" onClick={handleShow}>
                    {show ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
                </button>
            </div>
            {/* mobile nav */}
            <Offcanvas show={show} onHide={handleClose} className="w-[50%]">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <NavDropdown title="Trang chủ" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Trang chủ</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">Nông sản đặc trưng tỉnh Đắk Lắk</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Sản phẩm Ocop tỉnh Đắk Lắk</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Sản phẩm Ocop 62 tỉnh, thành phố</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Danh sách gian hàng</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Sản phẩm" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Trang chủ</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">Nông sản đặc trưng tỉnh Đắk Lắk</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Sản phẩm Ocop tỉnh Đắk Lắk</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Sản phẩm Ocop 62 tỉnh, thành phố</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Danh sách gian hàng</NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link href="#home" className="hover:text-[#006700]">Mời liên kết sản xuất - kinh doanh</Nav.Link>
                    <Nav.Link href="#link">Câu chuyện sản xuất</Nav.Link>
                    <Nav.Link href="#link">Nông sản mùa vụ</Nav.Link>
                    <Nav.Link href="#link">Thông tin thị trường</Nav.Link>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Menu;