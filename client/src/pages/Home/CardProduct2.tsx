import React from 'react';
import { FaRegHeart, FaStar } from "react-icons/fa";
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
        <div className='w-full flex justify-center'>
            <div className="w-full max-h-[350px] rounded-[12px] bg-white relative border-[1px] border-[#ddd]">
            <div className="w-full h-[160px] rounded-[12px] overflow-hidden p-3">
                    <img className="w-full h-full object-cover rounded-[12px]" src={product.thumbnail} alt={product.title} />
                </div>

                <div className=" w-[40px] h-[40px] text-white flex justify-center items-center text-[12px] absolute right-3 top-3">
                    <button className="text-[17px]"><FaRegHeart /></button>
                </div>


                <div className="px-[16px] flex flex-col justify-between">
                    <div className="w-full h-auto my-[10px] flex flex-col justify-between items-start text-[14px] font-medium">
                        <a href="#" className="overflow-ellipsis overflow-hidden line-clamp-2 max-w-[100%]">{product.title}</a>
                        <button className="text-[17px] flex text-gray-300"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></button>
                    </div>
                    <div className="w-full h-[36px] flex flex-row items-center gap-2 ">
                        <span className="text-[16px] text-[#2e2e2e] font-bold">{product.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProduct2;