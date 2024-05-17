// src/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Filter from './components/Filter';
import { Product } from '../../services/Product';

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

  return (
    <div>
      <h1>Product Filter</h1>
      <Filter onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default AllProducts;
