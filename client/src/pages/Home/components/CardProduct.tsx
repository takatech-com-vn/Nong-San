import React from 'react';
import { FaRegHeart } from "react-icons/fa";
type Product = {
    name: string;
    image: string;
    discount: string;
    price: string;
    originalPrice: string;
};
type CardProductProps = {
    product: Product;
};
const CardProduct: React.FC<CardProductProps> = ({ product }) => {
    return (
        <div className='w-full flex justify-center px-3'>
            <div className="w-full max-h-[343px] rounded-[12px] bg-white relative border-[1px] border-[#ddd]">
                <div className="w-full max-h-[246px] rounded-[12px] overflow-hidden">
                    <img className="" src={product.image} alt={product.name} />
                </div>

                {product.discount && (
                    <div className="bg-[#008000] rounded-full w-[40px] h-[40px] text-white flex justify-center items-center text-[12px] absolute right-3 top-3">
                        <span>{product.discount}</span>
                    </div>
                )}
                
                <div className="w-full h-[85px] px-[16px]">
                    <div className="w-full h-[40px] my-[10px] flex flex-row justify-between items-center text-[14px] font-medium">
                        <a href="#" className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[80%]">{product.name}</a>
                        <button className="text-[17px]"><FaRegHeart /></button>
                    </div>
                    <div className="w-full h-[36px] flex flex-row items-center gap-2">
                        <span className="text-[18px] text-red-600">{product.price}</span> <span className="text-[14px] text-[#2e2e2e]">{product.originalPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProduct;