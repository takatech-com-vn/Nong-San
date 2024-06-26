import React from 'react';
import { FaRegHeart, } from "react-icons/fa";
interface Brand {
    id: number;
    name: string;
    image: string;
    
}

type CardBrandProps = {
    brand: Brand;
};
const CardBrand: React.FC<CardBrandProps> = ({ brand }) => {
    return (
        <div className='w-full flex justify-center p-[4px]'>
            <div className="w-full max-h-[350px] rounded-[4px] bg-white relative border-[1px] border-[#ddd]  transition ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-400 duration-200">
            <div className="w-full h-[213px] rounded-[4px] overflow-hidden p-3">
                    <img className="w-full h-full object-contain rounded-[4px]" src={brand.image} alt={brand.name} />
                </div>
                <div className="px-[16px] flex flex-col justify-between">
                    <div className="w-full h-auto my-[10px] flex flex-col justify-between items-start text-[14px] font-medium">
                       
                        <button className="text-[17px] flex text-gray-300"><FaRegHeart /></button>
                    </div>             
                </div>
            </div>
        </div>
    );
};

export default CardBrand;