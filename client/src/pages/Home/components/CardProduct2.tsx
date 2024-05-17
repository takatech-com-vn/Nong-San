import React from 'react';
import { FaRegHeart, } from "react-icons/fa";
interface Product {
    id: string;
    title: string;
    price: string;
    thumbnail: string;
    
}

type CardProductProps = {
    product: Product;
};
const CardProduct2: React.FC<CardProductProps> = ({ product }) => {
    return (
        <div className='w-full flex justify-center p-[4px]'>
            <div className="w-full max-h-[350px] rounded-[4px] bg-white relative  border-[#ddd] 
             transition ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-400 duration-200">
            <div className="w-full h-[240px] rounded-[4px] overflow-hidden p-2">
                    <img className="w-full h-full object-cover rounded-[4px]" src={product.thumbnail} alt={product.title} />
                </div>

                <div className=" w-[40px] h-[40px] text-white flex justify-center items-center text-[12px] absolute right-3 top-3">
                    <button className="text-[17px]"><FaRegHeart /></button>
                </div>


                <div className="px-[16px] flex flex-col justify-between">
                    <div className="w-full h-auto my-[10px] flex flex-col justify-between items-start text-[14px] font-medium">
                        <a href="#" className="overflow-ellipsis overflow-hidden line-clamp-2 max-w-[100%] text-[#1a428a]">{product.title}</a>
                        {/* <button className="text-[17px] flex text-gray-300"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></button> */}
                    </div>
                    <div className="w-full h-[36px] flex flex-row items-center gap-2 ">
                        <span className="text-[16px] text-[#ff8300] font-bold">{product.price}đ</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProduct2;