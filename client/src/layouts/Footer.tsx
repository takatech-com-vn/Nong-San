import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import ScrollToTop from 'react-scroll-to-top';

const Footer = () => {
    return (
        <footer className=' w-full  border-t mt-[40px]'>
            <ScrollToTop smooth style={{display:'flex', justifyContent:'center', alignItems:'center', right:'10px',}} className='Glassmorphism'/>
            <div className="bg-white mt-[16px]">
                <div className="footer">
                    <div className="wrapper w-full  h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        <div className="footer-list ">
                            <img
                                className="h-[53px]"
                                src='https://chonongsandaklak.vn/upload/2006294/20231108/dang-ky-thong-bao-website-thuong-mai-dien-tu_2_333b3.png'
                                alt="bocongthuong"
                            />

                        </div>
                        <div className="footer-list ">
                            <h4 className="category-name text-[16px] font-bold mb-[10px] text-gray-900">Hỗ trợ khách hàng</h4>
                            <ul className='text-[14px]'>
                                <li className="footer-item">
                                    <a href="#" className="footer-link  hover:text-green-600">Đường dây nóng</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-link  hover:text-green-600">Trung tâm hỗ trợ</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-link  hover:text-green-600">Hướng dẫn đặt hàng</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-link  hover:text-green-600">Hướng dẫn bán hàng</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-link  hover:text-green-600">Hướng dẫn thanh toán</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-link  hover:text-green-600">Hướng dẫn đăng ký gian hàng</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-list col-span-2 sm:col-span-1 ">
                            <h4 className="category-name text-[16px] font-bold mb-[10px] text-gray-900">Về chúng tôi</h4>
                            <ul>
                                <li className="footer-item">
                                    <a href="#" className="footer-link  hover:text-green-600">Tin tức</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-link  hover:text-green-600">Giới thiệu</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-link  hover:text-green-600">Liên hệ</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-link  hover:text-green-600">Điều khoản sử dụng</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-link  hover:text-green-600">Hợp tác với chúng tôi</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-link  hover:text-green-600">Danh sách khuyến mại đã bán</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-link  hover:text-green-600">Quy chế hoạt động chonongsandaklak.vn</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-list col-span-2 sm:col-span-1">
                            <ul>
                                <li className="flex flex-row justify-between">
                                    <p className="text-gray-700 text-[14px] pb-[10px]">Tổng số gian hàng</p>  <span className='text-[14px] text-green-600'>98</span>
                                </li>
                                <li className="footer-item flex flex-row justify-between">
                                    <p className="text-gray-700">Tổng số mặt hàng</p> <span className='text-[14px] text-green-600'>299</span>
                                </li>
                                <li className="footer-item flex flex-row justify-between">
                                    <p className="text-gray-700">Số lượt truy cập</p> <span className='text-[14px] text-green-600'>18.854</span>
                                </li>
                                <li className="footer-item flex flex-row justify-between">
                                    <p className="text-gray-700">Khách hàng online</p> <span className='text-[14px] text-green-600'>2.129</span>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-list">
                            <ul>
                                <li className="">
                                    <p className="text-[14px] pb-[10px] text-gray-700">Số điện thoại hỗ trợ</p>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-link  text-green-600 text-[24px] font-bold">0123456789</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-link  text-gray-800 text-[16px]">Thanh toán</a>
                                </li>
                                <li className="footer-item">
                                    <img src='https://chonongsandaklak.vn/upload/2006294/20231023/Libro-de-reclamaciones_0_1_2b144.png'></img>
                                </li>
                                <li className="footer-item">
                                    <img src='https://chonongsandaklak.vn/upload/2006294/20231023/Libro-de-reclamaciones_0_2_001da.png'></img>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-list">
                            <h4 className="category-name text-[16px] font-bold mb-[10px] text-gray-900">Tải ứng dụng</h4>
                            <div className='flex flex-row gap-2'>
                                <div className="">
                                    <img src='https://chonongsandaklak.vn/upload/2006294/20221122/image_22_e2a17.png'></img>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <img src="https://chonongsandaklak.vn/upload/2006294/20221122/g4038_3453a.png" alt="" />
                                    </div>
                                    <div>
                                        <img src="https://chonongsandaklak.vn/upload/2006294/20221122/Group_065d1.png" alt="" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* ------------------- */}
                    <div className="footer-bottom py-10  bg-[#F9FAFB]">
                        <div className='wrapper w-full h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                            {/*  */}
                            <div className="footer-list col-span-2 ">
                                <ul className='text-[14px]'>
                                    <li className="mb-[10px]">
                                        <a href="#" className="text-[14px] text-gray-700  hover:text-green-600">Bản quyền thuộc về Hội Nông Dân Tỉnh Đắk Lắk</a>
                                    </li>
                                    <li className="">
                                        <a href="#" className="text-[14px] text-gray-700  hover:text-green-600">Hội nông dân tỉnh Đắk Lắk</a>
                                    </li>
                                    <li className="">
                                        <a href="#" className="text-[14px] text-gray-700  hover:text-green-600">QĐ thành lập: 326QĐ/TY ngày 03/07/1078 </a>
                                    </li>
                                    <li className="">
                                        <a href="#" className="text-[14px] text-gray-700  hover:text-green-600">Nơi cấp: Tỉnh uỷ Đắk Lắk</a>
                                    </li>
                                    <li className="">
                                        <a href="#" className="text-[14px] text-gray-700  hover:text-green-600">Địa chỉ: Số 21A, đường Trường Chinh, TP. Buôn Ma Thuột, tỉnh Đắk Lắk</a>
                                    </li>
                                    <li className="">
                                        <a href="#" className="text-[14px] text-gray-700  hover:text-green-600">Người đại diện: Bà Lại Thị Loan     Chức vụ: Chủ tịch</a>
                                    </li>
                                    <li className="">
                                        <a href="#" className="text-[14px] text-gray-700  hover:text-green-600">Điện thoại: 02623.957114 </a>
                                    </li>
                                    <li className="">
                                        <a href="#" className="text-[14px] text-gray-700  hover:text-green-600">Email: daklakchonongsan@gmail.com</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-list col-span-2 sm:col-span-1">
                                <ul className='text-[14px]'>
                                    <li className="footer-item">
                                        <a href="#" className="footer-link  hover:text-green-600">Điện thoại: 0263.957114 - 0263.957115</a>
                                    </li>
                                    <li className="footer-item">
                                        <a href="#" className="footer-link  hover:text-green-600">Email: daklakchonongsan@gmail.com</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-list col-span-2 sm:col-span-1">
                                <ul className='text-[14px]'>
                                    <li className="footer-item">
                                        <a href="#" className="footer-link  hover:text-green-600">Số giấy phép: 026xxxxx</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-list  col-span-2 sm:col-span-1">
                                <ul className='flex flex-row'>
                                    <li className="px-[10px]">
                                        <a href="#" className="text-[30px] text-gray-700 hover:text-green-600" ><FaTiktok /></a>
                                    </li>
                                    <li className="px-[10px]">
                                        <a href="#" className="text-[30px] text-gray-700 hover:text-green-600"><FaFacebook /></a>
                                    </li>
                                    <li className="px-[10px]">
                                        <a href="#" className="text-[30px] text-gray-700 hover:text-green-600"><FaInstagram /></a>
                                    </li>
                                    <li className="px-[10px]">
                                        <a href="#" className="text-[30px] text-gray-700 hover:text-green-600"><FaTwitter /></a>
                                    </li>

                                    <li className="px-[10px]">
                                        <a href="#" className="text-[30px] text-gray-700 hover:text-green-600"><FaYoutube /></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;