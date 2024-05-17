import React from 'react';
import { New } from '../../../services/New';

type CardBrandProps = {
    news: New;
};
const CardNews: React.FC<CardBrandProps> = ({ news  }) => {
    return (
        <div className='w-full flex justify-center p-[4px] '>
            <div className="w-full h-[250px] rounded-[4px] bg-white relative
            transition ease-in-out hover:-translate-y-1 hover:shadow-lg duration-200">
                <div className="w-full h-[177px] overflow-hidden">
                    <img className="w-full h-full object-cover rounded-[4px]" src={`${import.meta.env.VITE_APP_API_URL}${news.path}`} alt={news.name_new} />
                </div>
                <div className="px-[16px] flex flex-col justify-between">
                    <div className="w-full h-auto my-[10px] flex flex-col justify-between items-start text-[18px] font-medium">
                        <a href="#" className="overflow-ellipsis overflow-hidden line-clamp-2 max-w-[100%]">{news.short_description}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardNews;