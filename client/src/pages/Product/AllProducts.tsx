// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../../services/Product';
import Filter from './components/Filter';
import ProductList from './components/ProductList';
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
  {
    createdAt: "2023-11-25T10:00:00Z",
    name: "Bánh mì hoa cúc sourdough",
    thumbnail: ["https://via.placeholder.com/150"],
    price: 45000,
    quantity: 25,
    brand: "The Bread Basket",
    mota: "Bánh mì sourdough hoa cúc thơm ngon, vỏ giòn ruột mềm.",
    thongsokithuat: [], // Mảng rỗng
    id: "201",
    variations: [
      { 'price': 60000, 'capacity': "500g" }
    ],
    category: "Bánh mì",
    danhmuc: "Thực phẩm"
  },
  {
    createdAt: "2023-11-25T12:30:00Z",
    name: "Cà phê Arabica rang mộc nguyên chất",
    thumbnail: ["https://via.placeholder.com/150"],
    price: 300000,
    quantity: 10,
    brand: "Highland Coffee",
    mota: "Cà phê Arabica rang mộc, hương vị đậm đà, hậu vị ngọt.",
    thongsokithuat: [],
    id: "202",
    variations: [
      {
        "price": 28990000,
        "capacity": "250g"
      },
      {
        'price': 650000,
        'capacity': "500g"
      }
    ],
    category: "Cà phê",
    danhmuc: "Thực phẩm"
  },
  {
    createdAt: "2023-11-26T08:45:00Z",
    name: "Trà sữa trân châu đường đen",
    thumbnail: ["https://via.placeholder.com/150"],
    price: 55000,
    quantity: 80,
    brand: "Ding Tea",
    mota: "Trà sữa thơm ngon với trân châu đường đen dai mềm.",
    thongsokithuat: [],
    id: "203",
    variations: [
      { 'price': 65000, 'capacity': "Size L" }
    ],
    category: "Đồ uống",
    danhmuc: "Thực phẩm"
  }
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
  return (
    <div className="wrapper mx-auto p-4 flex">
      {/* Filter Section (left side) */}
      <div className="w-1/6 mr-2 bg-white">
        <Filter
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          products={products}
        />
      </div>
      {/* Product List (right side) */}
      <div className="w-5/6 ">
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};

export default AllProducts;
