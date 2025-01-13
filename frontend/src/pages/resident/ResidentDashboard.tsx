import React, { useState, useEffect } from 'react';
import Navbar from '../../components/NavBar';
import ProductCard from '../../components/ProductCard';
import FilterModal from '../../components/FilterModal';
import styles from './ResidentDashboard.css';

type Product = {
    id: number;
    image: string;
    title: string;
};

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
      { id: 1, image: 'image1.jpg', title: 'Product 1' },
      { id: 2, image: 'image2.jpg', title: 'Product 2' },
      { id: 3, image: 'image3.jpg', title: 'Product 3' },
    ]);
  }, [filters]);

  return (
    <div className='dashboard'>
      {/* Top Section */}
      <header className='header'>
        <h1>Welcome, {username}</h1>
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

        <section className='products'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
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
