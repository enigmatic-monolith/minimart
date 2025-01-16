import React, { useState } from 'react';
import './MinimartProductCard.css';
import { useCart } from '../pages/resident/CartContext';
import CustomNotificationModal from './CustomNotificationModal';

interface MinimartProductCardProps {
    id: number
    category: string
    title: string
    description: string | null
    denomination: string | null
    pointsRequired: number | null
    approved_by: string | null
    image_url: string
}

const MinimartProductCard: React.FC<MinimartProductCardProps> = ({
    id,
    category,
    title,
    description,
    denomination,
    pointsRequired,
    approved_by,
    image_url,
  }) => {
  const [quantity, setQuantity] = React.useState(0);
  const { addToCart } = useCart();
  const [ addToCartNotifOpen, setAddToCartNotifOpen ] = useState(false);

  const handleNotifOpen = () => setAddToCartNotifOpen(true);
  const handleNotifClose = () => setAddToCartNotifOpen(false);
  const handleNotifConfirm = () => {
    console.log('OK clicked');
    setQuantity(0); // Reset quantity after adding to cart
    setAddToCartNotifOpen(false);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({
        id,
        title,
        image_url,
        pointsRequired: pointsRequired || 0,
        quantity,
      });
      handleNotifOpen();
      console.log(`Added ${quantity} of ${title} to cart`);
    } else {
      console.log(`Error adding ${quantity} of ${title} to cart`);
    }
  };

  return (
    <div className='product-card'>
      <div className='product-details'>
        <img src={image_url} alt={title} className='product-image' />
        <div className='product-title'>{title}</div>
        <div className='product-description'>
          <p>Category: {category}</p>
          <p>{description}</p>
        </div>
        <div className='product-price'>
          <p>{pointsRequired} VPoints per {denomination}</p>
        </div>
      </div>
      
      <div className='actions'>
        <div className="quantity-controls">
          <button
            className="quantity-decrement"
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 0))}
          >
            <p className="minus-icon">-</p>
          </button>
          <span className="quantity-display">{quantity}</span>
          <button
            className="quantity-increment"
            onClick={() => setQuantity((prev) => Math.min(prev + 1, 9999))}
          >
            <p className="plus-icon">+</p>
          </button>
        </div>

        <button className='add-to-cart-button' onClick={handleAddToCart} disabled={quantity === 0}>
          {/* Check Bootstrap Icon issue */}
          <i className="bi bi-cart-plus" />Add to Cart 
        </button>
      </div>

      <CustomNotificationModal
        open={addToCartNotifOpen}
        title="Item Added to Cart"
        description={`Successfully Added ${quantity} of ${title} to cart`}
        onClose={handleNotifClose}
        onConfirm={handleNotifConfirm}
        confirmText="Ok"
      />
    </div>
  );
};

export default MinimartProductCard;
