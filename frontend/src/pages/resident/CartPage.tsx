import React, { useState } from 'react';
import { useCart } from './CartContext';
import { Button, TextField, Typography } from '@mui/material';
import NavBar from '../../components/NavBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useGetUserByIdQuery } from '../../redux/api/userApi';
import { usePlaceOrderMutation } from '../../redux/api/orderApi';

const CartPage: React.FC = () => {
  const { cart, getSubtotal, applyDiscount, updateQuantity, removeFromCart, clearCart } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discountValue, setDiscountValue] = useState(0);
  const [discountedSubtotal, setDiscountedSubtotal] = useState<number | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: userData } = useGetUserByIdQuery(user?.id!, {
    skip: !user?.id,
  });
  const [placeOrder, { isLoading, isSuccess, isError, error }] = usePlaceOrderMutation();

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

  const sufficientPoint =  userData?.points 
  ? (getSubtotal() - discountValue) <= userData.points 
  : false

  const handleSendOrder = async () => {
    const orderItems = cart.map((item) => ({
      product_id: item.id,
      price_at_purchase: item.pointsRequired,
      quantity: item.quantity
    }));

    try {
      await placeOrder(orderItems).unwrap();
      alert('Order Placed Successfully');
      clearCart();
    } catch (err) {
      console.error('Failed to place order:', err);
      alert(`Error: ${err} || Failed to Place Order.`)
    }
  }
  

  return (
    <div className='cart' style={{display:'flex', flexDirection: 'column'}}>
        <NavBar position="top" active='cart'/>
    
        <div style={{ padding: '20px' }}>
        <Typography variant="h4">Your Cart</Typography>
        <Typography variant="body1">You currently have {userData?.points} VPoints</Typography>

          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px' }}>
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
            <Button 
              style={{
                color: 'red',
              }}
              onClick={() => {
                removeFromCart(item.id); 
                handleApplyDiscount();
                }}>Remove</Button>
            </div>
        ))}

        <Typography variant="body2">Subtotal: {getSubtotal()} VPoints</Typography>
        <Typography variant="body2">Discount: {discountValue} VPoints</Typography>
        <Typography variant="h6">Total: {getSubtotal() - discountValue} VPoints</Typography>
        {(cart.length > 0) ? (
          sufficientPoint ? (
            <>
              <Typography variant='body2' color='lightgreen'>Sufficient VPoints. Review your orders before purchasing! </Typography>
              <Button
                variant="contained"
                color="success"
                style={{ marginTop: "10px" }}
                onClick={handleSendOrder}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Send Order'}
              </Button>
            </>
        ) : (
          <Typography variant="body2" color='red'>Insufficient VPoints. Complete more Tasks to earn more!</Typography>
        )) : (
          <Typography variant='body2' color='orange'>No items in your cart... </Typography>
        )}
        

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

          {isError && (
            <Typography variant="body2" color="red" style={{ marginTop: '10px' }}>
              Failed to place order: 'An error occurred'
            </Typography>
          )}
          {isSuccess && (
            <Typography variant="body2" color="lightgreen" style={{ marginTop: '10px' }}>
              Order placed successfully!
            </Typography>
          )}

        </div>
    </div>
  );
};

export default CartPage;
