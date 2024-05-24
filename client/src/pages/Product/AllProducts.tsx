// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../../services/Product';
const initialProducts: Product[] = [
  {
    createdAt: "2023-05-10T10:30:00Z",
    name: "iPhone 14 Pro Max",
    thumbnail: ["https://via.placeholder.com/150"],
    price: 29990000,
    quantity: 10,
    brand: "Apple",
    mota: "Điện thoại thông minh cao cấp",
    thongsokithuat: [],
    id: "1",
    variations: [{ price: 29990000, capacity: "128GB" }],
    category: "Điện thoại",
    danhmuc: "Công nghệ",
  },
  {
    createdAt: "2023-05-12T14:45:00Z",
    name: "Samsung Galaxy S23 Ultra",
    thumbnail: ["https://via.placeholder.com/150"],
    price: 25990000,
    quantity: 8,
    brand: "Samsung",
    mota: "Điện thoại Android mạnh mẽ",
    thongsokithuat: [],
    id: "2",
    variations: [{ price: 25990000, capacity: "256GB" }],
    category: "Điện thoại",
    danhmuc: "Công nghệ",
  },
  {
    createdAt: "2023-05-08T09:15:00Z",
    name: "MacBook Pro M2",
    thumbnail: ["https://via.placeholder.com/150"],
    price: 39990000,
    quantity: 5,
    brand: "Apple",
    mota: "Laptop hiệu năng cao",
    thongsokithuat: [],
    id: "3",
    variations: [{ price: 25990000, capacity: "256GB" }],
    category: "Laptop",
    danhmuc: "Công nghệ",
  },
  // ... thêm các sản phẩm khác
];
const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    category: string | null;
    brand: string | null;
    minPrice: number | null;
    maxPrice: number | null;
  }>({
    category: null,
    brand: null,
    minPrice: null,
    maxPrice: null,
  });

  // Fetch data from API (replace with your own fetch logic)
  useEffect(() => {
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, []);

  // Filter logic
  useEffect(() => {
    const filtered = products.filter((product) => {
      const categoryMatch =
        !selectedFilters.category || product.category === selectedFilters.category;
      const brandMatch =
        !selectedFilters.brand || product.brand === selectedFilters.brand;
      const priceMatch =
        (!selectedFilters.minPrice ||
          product.price >= selectedFilters.minPrice) &&
        (!selectedFilters.maxPrice ||
          product.price <= selectedFilters.maxPrice);
      return categoryMatch && brandMatch && priceMatch;
    });
    setFilteredProducts(filtered);
  }, [products, selectedFilters]);

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
    <div className="container mx-auto p-4 flex">
      {/* Filter Section (left side) */}
      <div className="w-1/4 mr-4">
        <div className="mb-2">
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

        <div className="mb-2">
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

        {/* Nút xóa tất cả bộ lọc */}
        <button
          onClick={removeAllFilters}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Xóa tất cả bộ lọc
        </button>
      </div>

      {/* Selected Filters (below Filter Section) */}
      <div className="w-1/4 mb-4">
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

      {/* Product List (right side) */}
      <div className="w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-md">
              <img
                src={product.thumbnail[0]}
                alt={product.name}
                className="w-full h-48 object-cover mb-2"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.brand}</p>
              <p className="text-red-500 font-bold">
                {product.price.toLocaleString()} VND
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
