import React from 'react';
interface News {
    id: number;
    name: string;
    image: string;

}

type CardBrandProps = {
    news: News;
};
const CardNews: React.FC<CardBrandProps> = ({ news }) => {
    return (
        <div className='w-full flex justify-center px-2'>
            <div className="w-full max-h-[350px] rounded-[12px] bg-white relative">
                <div className="w-full h-[177px] overflow-hidden">
                    <img className="w-full h-full object-cover " src={news.image} alt={news.name} />
                </div>
                <div className="px-[16px] flex flex-col justify-between">
                    <div className="w-full h-auto my-[10px] flex flex-col justify-between items-start text-[18px] font-medium">
                        <a href="#" className="overflow-ellipsis overflow-hidden line-clamp-2 max-w-[100%]">{news.name}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardNews;