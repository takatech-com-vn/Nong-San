// src/components/ProductList.tsx
import React from 'react';
import { Product } from '../../../services/Product';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Brand: {product.brand}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
