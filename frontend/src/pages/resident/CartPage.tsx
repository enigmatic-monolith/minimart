import React, { useState } from 'react';
import { useCart } from './CartContext';
import { Button, TextField, Typography } from '@mui/material';

const CartPage: React.FC = () => {
  const { cart, getSubtotal, applyDiscount, updateQuantity, removeFromCart } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discountValue, setDiscountValue] = useState(0);
  const [discountedSubtotal, setDiscountedSubtotal] = useState<number | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.pointsRequired * item.quantity, 0);

  const handleApplyDiscount = () => {
    const result = applyDiscount(discountCode);
    if (result === null) {
      alert('Invalid discount code');
    } else {
      setDiscountedSubtotal(result);
      setDiscountValue(subtotal - result)
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Your Cart</Typography>

      {cart.map((item) => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <img src={item.image_url} alt={item.title} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
          <div style={{ display:"flex", flexDirection:'column', alignItems: 'flex-start', paddingRight: '15px' }}>
            <Typography variant="body1">{item.title}</Typography>
            <Typography variant="body2">Unit VPoints Required: {item.pointsRequired} VPoints</Typography>
          </div>
          <TextField
            type="number"
            value={item.quantity}
            onChange={(e) => {
                updateQuantity(item.id, Math.max(1, parseInt(e.target.value, 10)));
                handleApplyDiscount();
            }}
                
            style={{ width: '60px', marginLeft: '10px' }}
          />
          <Button onClick={() => {
            removeFromCart(item.id); 
            handleApplyDiscount();
            }}>Remove</Button>
        </div>
      ))}

      <Typography variant="body2">Subtotal: {getSubtotal()} points</Typography>
      <Typography variant="body2">Discount: {discountValue} points</Typography>
      <Typography variant="h6">Total: {getSubtotal() - discountValue} points</Typography>

      <div style={{ marginTop: '20px' }}>
        <TextField
          label="Discount Code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" onClick={handleApplyDiscount}>
          Apply Discount
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
