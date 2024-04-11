import React, { useEffect, useState } from 'react';

import ImageSlider from './slidermenu';
import { BsChatLeftText } from 'react-icons/bs';
import { GoHeart } from 'react-icons/go';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';

const colRight = () => {

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isHovered, setIsHovered] = useState(Array(3).fill(false)); // Tạo một mảng lưu trữ trạng thái hover của từng mục

    const handleToggle = (index: number) => {
        setActiveIndex(prevIndex => prevIndex === index ? null : index);
    };

    const handleMouseEnter = (index: number) => {
        const newHoveredState = isHovered.map((item, idx) => idx === index);
        setIsHovered(newHoveredState);
    };

    const handleMouseLeave = () => {
        setIsHovered(Array(3).fill(false)); // Đặt lại trạng thái hover của tất cả các mục về false khi rời chuột
    };
    return (
        <div className='w-[20%] flex flex-col '>
            <ImageSlider />
            <ul className='flex flex-row justify-between px-6'>
                <li className="relative">
                    <a className="flex flex-col items-center" onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={handleMouseLeave} onClick={() => handleToggle(0)}>
                        <BsChatLeftText className={`mr-1 ${isHovered[0] ? 'text-blue-500' : ''} text-[30px]`} />
                        <p className={`opacity-0 transition-opacity ${isHovered[0] ? 'opacity-100' : ''} text-[10px]`}>Liên hệ gian hàng</p>
                    </a>
                    {activeIndex === 0 && (
                        <div className="absolute bg-white border border-gray-300 p-2 rounded-lg bottom-0 left-0 transform -translate-x-1/2 translate-y-full">
                            <p>Tin nhắn</p>
                        </div>
                    )}
                </li>
                <li className="relative">
                    <a href="#" className="flex flex-col items-center" onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave} onClick={() => handleToggle(1)}>
                        <GoHeart className={`mr-1 ${isHovered[1] ? 'text-blue-500' : ''} text-[30px]`} />
                        <p className={`opacity-0 transition-opacity ${isHovered[1] ? 'opacity-100' : ''} text-[10px]`}>Yêu thích</p>
                    </a>
                    {activeIndex === 1 && (
                        <div className="absolute bg-white border border-gray-300 p-2 rounded-lg bottom-0 left-0 transform -translate-x-1/2 translate-y-full">
                            {/* Nội dung dropdown của mục "Yêu thích" */}
                        </div>
                    )}
                </li>
                <li className="relative">
                    <a href="#" className="flex flex-col items-center" onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave} onClick={() => handleToggle(2)}>
                        <PiShoppingCartSimpleLight className={`mr-1 ${isHovered[2] ? 'text-blue-500' : ''} text-[30px]`} />
                        <p className={`opacity-0 transition-opacity ${isHovered[2] ? 'opacity-100' : ''} text-[10px]`}>Giỏ hàng</p>
                    </a>
                    {activeIndex === 2 && (
                        <div className="absolute bg-white border border-gray-300 p-2 rounded-lg bottom-0 left-0 transform -translate-x-1/2 translate-y-full">
                            <p>Giỏ hàng</p>
                        </div>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default colRight;