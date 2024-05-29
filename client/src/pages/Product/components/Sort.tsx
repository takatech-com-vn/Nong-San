import React, { useState } from "react";
import { BsChevronDown, BsSortDown, BsSortUp } from "react-icons/bs";
import { GoClock } from "react-icons/go";

interface SortProps {
    onSort: (field: "createdAt" | "price", order: "asc" | "desc") => void;
}

const Sort: React.FC<SortProps> = ({ onSort }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const options = [
        { label: "Mới nhất", value: "createdAt_desc", icon: GoClock },
        { label: "Giá cao", value: "price_asc", icon: BsSortUp },
        { label: "Giá thấp", value: "price_desc", icon: BsSortDown },
    ];

    const handleOptionClick = (option: { label: string; value: string }) => {
        setSelectedOption(option.label);
        setIsOpen(false);

        const [field, order] = option.value.split("_");
        onSort(field as "createdAt" | "price", order as "asc" | "desc");
    };

    return (
        <div className="relative w-auto h-[30px] flex flex-row justify-center items-center gap-1 text-xs">
            <div className="flex w-[100px] h-full justify-center items-center">
                <span className="text-gray-500">Sắp xếp:</span>
            </div>
            <button
                className="flex items-center justify-between w-full h-full  px-2 py-1 text-gray-700  hover:text-[#ff8300] focus:text-[#ff8300] font-bold"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-row items-center w-full whitespace-nowrap gap-1 ">
                    <span>
                        {selectedOption || "Sort"}
                    </span>
                    <div className="w-3 h-3">
                        <BsChevronDown />
                    </div>
                </div>
            </button>
            {isOpen && (
                <div className="absolute mt-2 top-7 w-full bg-white rounded-md shadow-xl">
                    <ul>
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className={`px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 ${selectedOption === option.label ? "text-[#ff8300] font-semibold" : ""
                                    }`}
                                onClick={() => handleOptionClick(option)}
                            >
                                <option.icon className="mr-2" /> {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sort;
