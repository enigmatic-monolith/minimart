import React from 'react';
// import styles from './ProductCard.css';

type ProductCardProps = {
  product: {
    id: number;
    image: string;
    title: string;
  };
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`);
  };

  return (
    <div className='card'>
      <img src={product.image} alt={product.title} className='image' />
      <h3>{product.title}</h3>
      <div className='actions'>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(Number(e.target.value))}
          className='quantity'
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
