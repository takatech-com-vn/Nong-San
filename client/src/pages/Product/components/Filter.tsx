// src/components/Filter.tsx
import React, { useState } from 'react';

interface FilterProps {
  onFilterChange: (filters: { price: number; category: string; danhmuc: string }) => void;
  onClearFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, onClearFilters }) => {
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [danhmuc, setType] = useState<string>('');

  const handleFilterChange = () => {
    onFilterChange({ price, category, danhmuc });
  };

  const handleClearFilters = () => {
    setPrice(0);
    setCategory('');
    setType('');
    onClearFilters();
  };

  return (
    <div>
      <div>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Type:
          <input type="text" value={danhmuc} onChange={(e) => setType(e.target.value)} />
        </label>
      </div>
      <button onClick={handleFilterChange}>Apply Filters</button>
      <button onClick={handleClearFilters}>Clear Filters</button>
    </div>
  );
};

export default Filter;
