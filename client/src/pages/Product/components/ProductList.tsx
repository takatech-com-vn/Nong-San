import React from "react";
import { Product } from "../../../services/Product";
import { formatPriceVND } from "../../../utils/formatPriceVND";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-md bg-white">
          <img
            src={product.thumbnail[0]}
            alt={product.name}
            className="w-full h-48 object-cover mb-2"
          />
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.brand}</p>
          <p className="text-red-500 font-bold">
            {formatPriceVND(product.price)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;