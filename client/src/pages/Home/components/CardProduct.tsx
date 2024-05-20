import React from 'react';
// import { FaRegHeart } from "react-icons/fa";
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
        <div className='w-full flex justify-center p-[4px]'>
            <div className="w-full h-[343px] rounded-[4px]  bg-white relative border-[1px] border-[#ddd] 
            transition ease-in-out hover:-translate-y-[0.5] hover:shadow-lg hover:shadow-gray-400 duration-200">
                <div className="w-full max-h-[246px]  overflow-hidden p-2">
                    <img className="" src={product.image} alt={product.name} />
                </div>

                {product.discount && (
                    <div className="discount-tag w-[40px] h-[40px] text-white flex flex-col justify-center items-center text-[10px] absolute right-0 top-0 text-center break-words">
                        <span>{product.discount}</span>
                        <span>off</span>
                    </div>

                )}

                <div className="w-full h-[85px] px-[16px]">
                    <div className="w-full h-[40px] my-[10px] flex flex-row justify-between items-center text-[14px] font-medium">
                        <a href="#" className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[100%] text-[#1a428a]">{product.name}</a>
                        {/* <button className="text-[17px]"><FaRegHeart /></button> */}
                    </div>
                    <div className="w-full h-[36px] flex flex-row items-center gap-2 justify-start">
                        <span className="text-[16px] text-[#ff8708]">{product.price}</span>
                        {product.originalPrice &&(
                              <span className="text-[14px] text-[#2e2e2e]">-{product.originalPrice}</span>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProduct;