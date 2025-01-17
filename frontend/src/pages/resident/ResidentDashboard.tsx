import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import Navbar from '../../components/NavBar';
import MinimartProductCard from '../../components/MinimartProductCard';
import FilterModal from '../../components/FilterModal';
import Grid2 from '@mui/material/Grid2';
import './ResidentDashboard.css';
import placeholderImg from '../../assets/image-placeholder.png';

import { Product } from '../../types/product';
import { MinimartFilter } from '../../types/minimartFilter';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useGetUserByIdQuery } from '../../redux/api/userApi';
import { useGetAllProductsQuery } from '../../redux/api/productApi';

const ResidentDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: userData } = useGetUserByIdQuery(user?.id!, {
    skip: !user?.id,
  });
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [filters, setFilters] = useState<MinimartFilter>({
    category: [],
    title: '',
    pointsRequired: { min: 0, max: 10000 },
  });

  const { data: products = [], isLoading } = useGetAllProductsQuery();

  // Responsive design handler
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const applyFilters = () => {
    return products.filter((product) => {
      const matchesCategory =
        filters.category.length === 0 || filters.category.includes(product.category);
     const matchesTitle =
        filters.title.trim() === '' || product.name.toLowerCase().includes(filters.title.toLowerCase());
      const matchesPoints =
        (product.price || 0) >= filters.pointsRequired.min &&
        (product.price || 0) <= filters.pointsRequired.max;

      return matchesCategory && matchesTitle && matchesPoints;
    });
  };

  const filteredProducts = applyFilters();

  return (
    <div className='dashboard'>
      {/* Top Section */}
      <header className='header'>
        <h3>Welcome, {userData?.username}</h3>
        <div className='voucherPoints'>
          Voucher Points: <span>{userData?.points}</span>
        </div>
      </header>

      <Navbar position="top" active='dashboard'/>

      {/* Main Content */}
      <div className='mainContent'>
        <aside className='filters'>
          <button onClick={() => setShowFilterModal(true)}>Filter Options</button>
        </aside>

        {filteredProducts.length > 0 ? (
          <Grid2 className='products' container direction='row' spacing={1}>
            {filteredProducts.map((product) => (
              <Grid2 key={product.id}>
                  <MinimartProductCard
                    id={product.id}
                    category={product.category}
                    title={product.name}
                    description={product.desc}
                    denomination="Unit"
                    pointsRequired={product.price}
                    approved_by={product.created_by}
                    image_url={product.image_url || placeholderImg}
                  />
              </Grid2>
            ))}
          </Grid2>
        ) : (
          <div className="no-products">
            <p>No products match the current filters. Please try adjusting your filters.</p>
          </div>
        )}
        
    </div>

      {/* Filter Modal for Small Screens */}
      {showFilterModal && (
        <FilterModal
          filters={filters}
          onClose={() => setShowFilterModal(false)}
          onSave={(newFilters) => {
            setFilters(newFilters);
            setShowFilterModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ResidentDashboard;
