import { useState } from "react";

import ImageSlider from "./slidermenu";
import { BsChatLeftText } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { PiShoppingCartSimpleLight } from "react-icons/pi";

const ColRight = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  return (
    <div className="w-[40%] md:w-[20%] flex flex-col ">
      <ImageSlider />
      <ul className="flex flex-row justify-between ">
        <li className="relative group">
          <a
            className="flex flex-col items-center"
            onClick={() => handleToggle(0)}
          >
            <BsChatLeftText className="mr-1 text-[30px] group-hover:text-blue-500" />
            <p className="text-[10px] opacity-0 group-hover:!opacity-100 transition-opacity duration-300 ease-in-out">
              Liên hệ
            </p>
          </a>
          {activeIndex === 0 && (
            <div className="absolute bg-white border border-gray-300 p-2 rounded-lg bottom-0 left-0 transform -translate-x-1/2 translate-y-full">
              <p>Tin nhắn</p>
            </div>
          )}
        </li>
        <li className="relative group">
          <a
            href="#"
            className="flex flex-col items-center"
            onClick={() => handleToggle(1)}
          >
            <GoHeart className="mr-1 text-[30px] group-hover:text-blue-500" />
            <p className="text-[10px] opacity-0 group-hover:!opacity-100 transition-opacity duration-300 ease-in-out">
              Yêu thích
            </p>
          </a>         
        </li>
        <li className="relative group">
          <a
            href="#"
            className="flex flex-col items-center"
            onClick={() => handleToggle(2)}
          >
            <PiShoppingCartSimpleLight className="mr-1 text-[30px] group-hover:text-blue-500" />
            <p className="text-[10px] opacity-0 group-hover:!opacity-100 transition-opacity duration-300 ease-in-out">
              Giỏ hàng
            </p>
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

export default ColRight;
