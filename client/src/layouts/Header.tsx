import React, { useEffect, useState } from 'react';

import ColLeft from './components/colLeft';
import ColCenter from './components/colCenter';
import ColRight from './components/colRight';


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
        window.addEventListener('scroll', checkScroll);
        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    }, []);
    return (
        <header className="wrapper h-[250px] bg-white px-5">
            <div className="w-full h-[46.8px] flex flex-row justify-between items-center text-[14px] border-b border-gray-300">
                <div className='flex flex-row gap-4'>
                    <a href="">Kênh người bán</a>
                    <a href="">Tin tức</a>
                    <a href="">Tải ứng dụng</a>
                </div>
                <div className='flex flex-row gap-4'>
                    <a href="">Hỗ trợ</a>
                    <a href="">Đăng ký</a>
                    <a href="">Đăng nhập</a>
                </div>
            </div>
            <div className={`fixed ${isScrolled ? 'top-[0]' : ''} wrapper px-5`}>
                <nav className="  w-full h-[203.65px] bg-white pt-[24px]">
                    <div className='flex flex-row gap-[30px]  border-b border-gray-300'>
                        <ColLeft></ColLeft>
                        <ColCenter></ColCenter>
                        <ColRight></ColRight>
                    </div>
                    <div className="w-full h-[46.8px] flex flex-row justify-between items-center text-[14px] border-b border-gray-300">
                        <div className='flex flex-row gap-4'>
                            <a href="">Tìm kiếm hàng đầu:</a>
                            <a href="">Trái cây</a>
                            <a href="">Sản phẩm</a>
                        </div>
                    </div>
                </nav>
            </div>

        </header>
    );
};

export default Header;