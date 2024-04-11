import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';


const colCenter = () => {
    const [selectedValue, setSelectedValue] = useState('');
     // Hàm xử lý sự kiện thay đổi giá trị được chọn
     const handleSelectChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedValue(event.target.value);
    };
    // tim kiemkiem
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
    };
    return (
        <div className='w-[714.61px]'>
        <div className="col-center">
            <form id="form24" className="search-form relative">
                <div className="search-body relative border-solid border-2 rounded-2xl
                 border-green-700 flex justify-between items-center h-[55.6px] text-black">
                    <div className="flex w-32 h-14p-2 justify-center items-center ">
                        <select value={selectedValue} onChange={handleSelectChange} className='form-control uppercase'>
                            <option value="">Danh mục mặt hànfwee fEFEvsd ưef</option>
                            <option value="option1">Tùy chọn 1</option>
                            <option value="option2">Tùy chọn 2</option>
                            <option value="option3">Tùy chọn 3</option>
                        </select>
                    </div>
                    <div className="grow p-3 border-l-2 border-r-2 border-green-700">
                        <input
                            className="w-full"
                            type="text"
                            placeholder="Tìm kiếm theo ngành, sản phẩm, thương hiệu..."
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button className="flex w-[70px] text-white h-14  bg-green-700 rounded-r-2xl justify-center items-center text-[30px]">
                        <FiSearch />
                    </button>
                </div>
            </form>
            <div className="text-green-700  text-[24px] font-medium mt-[10px]">
                CÙNG NHAU XÂY DỰNG THƯƠNG HIỆU NÔNG SẢN ĐẮK LẮK
            </div>
        </div>
    </div>
    );
};

export default colCenter;