import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from '../../components/NavBar';
import ProductCard from '../../components/ProductCard';
import FilterModal from '../../components/FilterModal';
// import styles from './ResidentDashboard.css';
import Grid2 from '@mui/material/Grid2';
import './ResidentDashboard.css';

import { Product } from '../../types/product';

const ResidentDashboard: React.FC = () => {
  const [username, setUsername] = useState('Resident Name'); // Placeholder
  const [voucherPoints, setVoucherPoints] = useState(100);  // Placeholder
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]); // Mock data to be fetched
  const [filters, setFilters] = useState({});  // Filter options state

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
      { id: 1, category: 'stationery', image_url: 'image1.jpg', title: 'Stationery 1', description: 'The product description goes here!', denomination: 'pcs', pointsRequired: 5, approved_by: 'admin' },
      { id: 2, category: 'paper products', image_url: 'image2.jpg', title: 'Paper Product 1', description: 'The product description goes here!', denomination: 'pcs', pointsRequired: 3, approved_by: 'admin' },
      { id: 3, category: 'toys', image_url: 'image3.jpg', title: 'Toys 1', description: 'The product description goes here!', denomination: 'pcs', pointsRequired: 6, approved_by: 'admin' },
      { id: 4, category: 'stationery', image_url: 'image4.jpg', title: 'Stationery 2', description: 'The product description goes here!', denomination: 'pcs', pointsRequired: 5, approved_by: 'admin' },
      { id: 5, category: 'paper products', image_url: 'image5.jpg', title: 'Paper Product 2', description: 'The product description goes here!', denomination: 'pcs', pointsRequired: 10, approved_by: 'admin' },
      { id: 6, category: 'toys', image_url: 'image6.jpg', title: 'Toys 2', description: 'The product description goes here!', denomination: 'pcs', pointsRequired: 8, approved_by: 'admin' },
    
    ]);
  }, [filters]);

  return (
    <div className='dashboard'>
      {/* Top Section */}
      <header className='header'>
        <h3>Welcome, {username}</h3>
        <div className='voucherPoints'>
          Voucher Points: <span>{voucherPoints}</span>
        </div>
      </header>

      {/* Navigation Bar */}
      {isLargeScreen ? (
        <Navbar position="top" />
      ) : (
        <Navbar position="bottom" active="dashboard" />
      )}

      {/* Main Content */}
      <div className='mainContent'>
        {isLargeScreen && (
          <aside className='filters'>
            <button onClick={() => setShowFilterModal(true)}>Filter Options</button>
          </aside>
        )}

        <Grid2 className='products' container direction='row' spacing={1}>
          {products.map((product) => (
            <Grid2 key={product.id}>
                <ProductCard
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
      </div>

      {/* Filter Modal for Small Screens */}
      {!isLargeScreen && showFilterModal && (
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
