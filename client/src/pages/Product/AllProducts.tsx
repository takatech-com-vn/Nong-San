// src/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Filter from './components/Filter';
import { Product } from '../../services/Product';
import { Menu } from 'antd';

interface Category {
  title: string;
  subCategories: string[];
}

const categories: Category[] = [
  {
    title: 'Bất Động Sản',
    subCategories: [],
  },
  {
    title: 'Nguyên Vật Liệu / Vật Liệu Xây Dựng',
    subCategories: [
      'Ngành In Ấn & Bao Bì',
      'Ngành Dệt May',
      'Ngành Nhựa & Cao Su',
      'Ngành Thực Phẩm & Đồ Uống',
    ],
  },
  {
    title: 'Máy Móc Công Nghiệp / Máy Móc Xây Dựng',
    subCategories: [
      'Thiết Bị Kho & Đóng Gói',
      'Máy Móc Cơ Khí & Xi Mạ',
      'Máy Móc Vệ Sinh Công Nghiệp',
    ],
  },
  {
    title: 'Xây Dựng / Vật Tư Xây Dựng',
    subCategories: [],
  },
  {
    title: 'Thiết Bị Nội & Ngoại Thất',
    subCategories: [],
  },
];
const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get<Product[]>('https://66383a474253a866a24d16fe.mockapi.io/fake-api-product/product/')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const handleFilterChange = (filters: { price: number; category: string; danhmuc: string }) => {
    setFilteredProducts(
      products.filter(
        (product) =>
          (filters.price === 0 || product.price <= filters.price) &&
          (filters.category === '' || product.category === filters.category) &&
          (filters.danhmuc === '' || product.danhmuc === filters.danhmuc)
      )
    );
  };

  const handleClearFilters = () => {
    setFilteredProducts(products);
  };
  const [currentSubCategories, setCurrentSubCategories] = useState<string[]>([]);
  const [hovered, setHovered] = useState<boolean>(false);

  const handleHover = (subCategories: string[]) => {
    setCurrentSubCategories(subCategories);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
    <div>
      <h1>Product Filter</h1>
      <Filter onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
      <ProductList products={filteredProducts} />
      <div className="flex" onMouseLeave={handleMouseLeave}>
        <Menu mode="vertical" className="w-64">
          {categories.map((category, index) => (
            <Menu.Item
              key={index}
              onMouseEnter={() => handleHover(category.subCategories)}
            >
              {category.title}
            </Menu.Item>
          ))}
        </Menu>
        {hovered && (
          <div className="ml-4 p-4 border border-gray-200 rounded shadow-lg w-max  ">
            {currentSubCategories.length > 0 ? (
              <ul>
                {currentSubCategories.map((subCategory, index) => (
                  <li key={index} className="py-1">
                    {subCategory}
                  </li>
                ))}
              </ul>
            ) : (
              <div>Không có danh mục con</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
