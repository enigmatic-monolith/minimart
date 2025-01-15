import React, { useState } from 'react';
import './FilterModal.css';
import { MinimartFilter } from '../types/minimartFilter';

type FilterModalProps = {
  filters: {
    category: string[];
    title: string;
    pointsRequired: { min: number; max: number };
  };
  onClose: () => void;
  onSave: (newFilters: MinimartFilter) => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ filters, onClose, onSave }) => {
  const [localFilters, setLocalFilters] = React.useState(filters);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10000);

  const handleCategoryChange = (category: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      category: prev.category?.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...(prev.category || []), category],
    }));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters((prev) => ({ ...prev, title: event.target.value }));
  };

  const handleMinChange = (value: number) => {
    if (value <= maxValue) {
      setMinValue(value);
      setLocalFilters({ ...localFilters, pointsRequired: { min: value, max: maxValue } });
    }
  };

  const handleMaxChange = (value: number) => {
    if (value >= minValue) {
      setMaxValue(value);
      setLocalFilters({ ...localFilters, pointsRequired: { min: minValue, max: value } });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <h2>Filter Options</h2>

        {/* Category Filter */}
        <div>
          <h4>Category</h4>
          {['Stationery', 'Paper Products', 'Toys'].map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                checked={localFilters.category?.includes(category) || false}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>

        {/* Title Filter */}
        <div>
          <h4>Product Name</h4>
          <input
            type="text"
            value={localFilters.title || ''}
            onChange={handleTitleChange}
            placeholder="Search by Product Name"
          />
        </div>

        {/* Dual-Range Slider for Points Required */}
        <h4>Points Required</h4>
        <div className="range-slider">
          <input
            id='min-input'
            type="range"
            min="0"
            max="10000"
            step="50"
            value={minValue}
            onChange={(e) => handleMinChange(Number(e.target.value))}
          />
          <input
            id='max-input'
            type="range"
            min="0"
            max="10000"
            step="50"
            value={maxValue}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
          />
          <div className="range-values">
            <span>{minValue}</span>
            <span>{maxValue}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          <button onClick={() => onSave(localFilters)}>Save</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
