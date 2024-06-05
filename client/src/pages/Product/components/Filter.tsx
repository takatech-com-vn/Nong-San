import React from "react";
import { Product } from "../../../services/Product";
import { FaFilter } from "react-icons/fa";
// import { BsXCircle } from "react-icons/bs";
import { Badge, Checkbox, } from "antd";

interface ProductFilterProps {
  selectedFilters: {
    category: string[] | null;
    brand: string | null;
    minPrice: number | null;
    maxPrice: number | null;
  };
  setSelectedFilters: React.Dispatch<React.SetStateAction<{
    category: string[] | null;
    brand: string | null;
    minPrice: number | null;
    maxPrice: number | null;
  }>>;
  products: Product[];
}

const Filter: React.FC<ProductFilterProps> = ({
  selectedFilters,
  setSelectedFilters,
  products,
}) => {
  // Remove filter
  // const removeFilter = (filterKey: keyof typeof selectedFilters) => {
  //   setSelectedFilters({ ...selectedFilters, [filterKey]: null });
  // };
  // Remove all filters
  const removeAllFilters = () => {
    setSelectedFilters({
      category: null,
      brand: null,
      minPrice: null,
      maxPrice: null,
    });
  };
  const filterCount = Object.values(selectedFilters).filter(Boolean).length;
  return (
    <div className="flex flex-col justify-start items-center text-sm">
      <div className="w-full">
        <div className="flex flex-col gap-1">
          <Badge count={filterCount} size="small">
            <div className="flex items-center p-1">
              <FaFilter />
              <span>Bộ lọc:</span>
            </div>
          </Badge>

          <div className="border rounded">
            {/* Selected Filters (below Filter Section) */}
            {/* <div>
              {Object.entries(selectedFilters)
                .filter(([, value]) => Boolean(value) && (!Array.isArray(value) || value.length > 0)) // Chỉ hiển thị các giá trị không rỗng
                .map(([key, value]) => (
                  <div className="flex" key={key}>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:text-blue-400 border border-blue-400 flex items-center gap-1">
                      {Array.isArray(value) ? value.join(", ") : value}
                      <BsXCircle
                        className="text-red-500 hover:underline"
                        onClick={() => removeFilter(key as keyof typeof selectedFilters)}
                      />
                    </span>
                  </div>
                ))}

            </div> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full mb-2">
        <label htmlFor="category">Danh mục:</label>
        <Checkbox.Group className="flex flex-col"
          options={[...new Set(products.map((p) => p.category))].map(
            (category) => ({
              label: category,
              value: category,
            })
          )}
          value={selectedFilters.category || []} 
          onChange={(checkedValues) =>
            setSelectedFilters({
              ...selectedFilters,
              category: checkedValues as string[], 
            })
          }
        />
      </div>

      <div className="flex flex-col w-full mb-2">
        <label htmlFor="brand">Thương hiệu:</label>
        <select
          className="border rounded p-2"
          id="brand"
          value={selectedFilters.brand || ""}
          onChange={(e) =>
            setSelectedFilters({
              ...selectedFilters,
              brand: e.target.value || null,
            })
          }
        >
          <option value="">Tất cả</option>
          {[...new Set(products.map((p) => p.brand))].map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col w-full mb-2">
        <div className="mb-2">
          <label htmlFor="KhoangGia">Khoảng giá:</label>
        </div>
        <div className="flex flex-row justify-between max-w-md gap-1">
          <div className="flex flex-1">
            <input
              className="border rounded p-2 w-full"
              placeholder="Từ"
              type="number"
              id="minPrice"
              value={selectedFilters.minPrice || ""}
              onChange={(e) =>
                setSelectedFilters({
                  ...selectedFilters,
                  minPrice: e.target.value ? parseInt(e.target.value, 10) : null,
                })
              }
            />
          </div>
          <span className="flex items-center">-</span>
          <div className="flex flex-1">
            <input
              className="border rounded p-2 w-full"
              placeholder="Đến"
              type="number"
              id="maxPrice"
              value={selectedFilters.maxPrice || ""}
              onChange={(e) =>
                setSelectedFilters({
                  ...selectedFilters,
                  maxPrice: e.target.value ? parseInt(e.target.value, 10) : null,
                })
              }
            />
          </div>
        </div>
      </div>
      {/* Nút xóa tất cả bộ lọc */}
      <button
        onClick={removeAllFilters}
        className="w-full bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-sm mt-4 uppercase"
      >
        Xóa tất cả
      </button>
    </div>
  );
};

export default Filter;