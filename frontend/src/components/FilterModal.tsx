import React from 'react';
// import styles from './FilterModal.css';

type FilterModalProps = {
  filters: object;
  onClose: () => void;
  onSave: (newFilters: object) => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ filters, onClose, onSave }) => {
  const [localFilters, setLocalFilters] = React.useState(filters);

  return (
    <div className='modal'>
      <div className='content'>
        <h2>Filter Options</h2>
        {/* Add your filter controls here */}
        <button onClick={() => onSave(localFilters)}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FilterModal;
