import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

import Slider from "react-slick";
import Card from "./Card";
import { NextArrow, PrevArrow } from "../../components/slick/index";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

const Home: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

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
  const [isProductOpen, setIsProductOpen] = useState(false);
  // const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // slider setting
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow onClick={function (): void {
      throw new Error("Function not implemented.");
    }} />,
    prevArrow: <PrevArrow onClick={function (): void {
      throw new Error("Function not implemented.");
    }} />,
  };
  const data = [
    {
      imageUrl:
        "https://chonongsandaklak.vn/upload/2006294/20231017/banner1_new-1920x769_1_45209.png",
      buttonText: "Hội chợ trực tuyến",
    },
    {
      imageUrl:
        "https://chonongsandaklak.vn/upload/2006294/20231116/370296858_6392210657551570_989834110336836902_n_8b8b5.png",
      buttonText: "Hội chợ trực tuyến",
    },
  ];
  return (
    <div
      className={`wrapper h-[1000px]  ${isScrolled ? "pt-[280px] md:pt-[260px]" : "pt-3 md:pt-0"}`}
    >
      <div className="flex flex-col">
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



        <div className="max-h-[380px]">
          <Slider {...settings}>
            {data.map((item, index) => (
              <Card
                key={index}
                imageUrl={item.imageUrl}
                buttonText={item.buttonText}
              ></Card>
            ))}
          </Slider>
        </div>
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

export default Home;
