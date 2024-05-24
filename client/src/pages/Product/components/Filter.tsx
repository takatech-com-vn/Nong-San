import React from "react";
import { Product } from "../../../services/Product";
interface ProductFilterProps {
  selectedFilters: {
    category: string | null;
    brand: string | null;
    minPrice: number | null;
    maxPrice: number | null;
  };
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<ProductFilterProps["selectedFilters"]>
  >;
  products: Product[];
}

const Filter: React.FC<ProductFilterProps> = ({
  selectedFilters,
  setSelectedFilters,
  products,
}) => {
    // Remove filter
    const removeFilter = (filterKey: keyof typeof selectedFilters) => {
      setSelectedFilters({ ...selectedFilters, [filterKey]: null });
    };
  // Remove all filters
  const removeAllFilters = () => {
    setSelectedFilters({
      category: null,
      brand: null,
      minPrice: null,
      maxPrice: null,
    });
  };


  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-2 bg-red-200">
          <label htmlFor="category">Danh mục:</label>
          <select
            id="category"
            value={selectedFilters.category || ""}
            onChange={(e) =>
              setSelectedFilters({
                ...selectedFilters,
                category: e.target.value || null,
              })
            }
          >
            <option value="">Tất cả</option>
            {[...new Set(products.map((p) => p.category))].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2 bg-red-200">
          <label htmlFor="brand">Thương hiệu:</label>
          <select
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

        <div className="mb-2">
          <label htmlFor="minPrice">Giá từ:</label>
          <input
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

        <div className="mb-2">
          <label htmlFor="maxPrice">Giá đến:</label>
          <input
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
        {/* Selected Filters (below Filter Section) */}
        <div className=" mb-4">
          {Object.entries(selectedFilters).map(([key, value]) =>
            value ? (
              <div key={key} className="flex items-center">
                <span className="mr-2">
                  {key}: {value}
                </span>
                <button
                  onClick={() => removeFilter(key as keyof typeof selectedFilters)}
                  className="text-red-500 hover:underline"
                >
                  Xóa
                </button>
              </div>
            ) : null
          )}
        </div>
        {/* Nút xóa tất cả bộ lọc */}
        <button
          onClick={removeAllFilters}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Xóa tất cả bộ lọc
        </button>
    </div>
  );
};

export default Filter;
