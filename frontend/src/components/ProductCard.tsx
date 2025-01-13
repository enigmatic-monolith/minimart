import React from 'react';
import './ProductCard.css';

interface ProductCardProps {
    id: number
    category: string
    title: string
    description: string | null
    denomination: string | null
    pointsRequired: number | null
    approved_by: string | null
    image_url: string
}

const ProductCard: React.FC<ProductCardProps> = ({
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

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${title} to cart`);
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
    </div>
  );
};

export default ProductCard;
