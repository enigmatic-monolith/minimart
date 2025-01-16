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

const ResidentDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: userData } = useGetUserByIdQuery(user?.id!, {
    skip: !user?.id,
  });
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]); // Mock data to be fetched

  const [filters, setFilters] = useState<MinimartFilter>({
    category: [],
    title: '',
    pointsRequired: { min: 0, max: 10000 },
  });

  // Responsive design handler
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Placeholder fetch logic
  useEffect(() => {
    // Fetch products from API using filters
    setProducts([
      { id: 1, category: 'Stationery', image_url: placeholderImg, title: 'Stationery 1', description: 'The product description goes here!', denomination: 'pcs', pointsRequired: 50, approved_by: 'admin' },
      { id: 2, category: 'Paper Products', image_url: placeholderImg, title: 'Paper Product 1', description: 'The product description goes here!', denomination: 'pcs', pointsRequired: 30, approved_by: 'admin' },
      { id: 3, category: 'Toys', image_url: placeholderImg, title: 'Toys 1', description: 'The product description goes here!', denomination: 'pcs', pointsRequired: 560, approved_by: 'admin' },
      { id: 4, category: 'Stationery', image_url: placeholderImg, title: 'Stationery 2', description: 'The product description goes here!', denomination: 'pcs', pointsRequired: 150, approved_by: 'admin' },
      { id: 5, category: 'Paper Products', image_url: placeholderImg, title: 'Paper Product 2', description: 'The product description goes here!', denomination: 'pcs', pointsRequired: 100, approved_by: 'admin' },
      { id: 6, category: 'Toys', image_url: placeholderImg, title: 'Toys 2', description: 'The product description goes here!', denomination: 'pcs', pointsRequired: 380, approved_by: 'admin' },
    
    ]);
  }, [filters]);

  const applyFilters = () => {
    return products.filter((product) => {
      const matchesCategory =
        filters.category.length === 0 || filters.category.includes(product.category);
      const matchesTitle =
        filters.title.trim() === '' || product.title.toLowerCase().includes(filters.title.toLowerCase());
      const matchesPoints =
        (product.pointsRequired || 0) >= filters.pointsRequired.min &&
        (product.pointsRequired || 0) <= filters.pointsRequired.max;

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
                    title={product.title}
                    description={product.description}
                    denomination={product.denomination}
                    pointsRequired={product.pointsRequired}
                    approved_by={product.approved_by}
                    image_url={product.image_url}
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
