import React, { createContext, useContext, useState } from 'react';

interface CartItem {
  id: number;
  title: string;
  image_url: string;
  pointsRequired: number;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  getSubtotal: () => number;
  applyDiscount: (discountCode: string) => number | null; // Returns updated subtotal or null if invalid
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0); // Store applied discount as a percentage (e.g., 10 for 10%)

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((cartItem) => (cartItem.id === id ? { ...cartItem, quantity } : cartItem))
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((cartItem) => cartItem.id !== id));
  };

  const getSubtotal = () => {
    return cart.reduce((subtotal, item) => subtotal + item.pointsRequired * item.quantity, 0);
  };

  const applyDiscount = (discountCode: string) => {
    // Example discount codes
    const validDiscounts: Record<string, number> = {
      "": 0,
      "SAVE1": 1, // 20% discount
      "SAVE5": 5, // 5% discount
      "SAVE10": 10, // 10% discount
      "SAVE20": 20, // 20% discount
      "SAVE30": 30, // 30% discount
      "SAVE50": 50, // 50% discount
      "SAVE75": 75, // 75% discount
    };

    const discountValue = validDiscounts[discountCode];
    if (discountValue !== undefined) {
      setDiscount(discountValue);
      const subtotal = getSubtotal();
      return Math.round(subtotal - (subtotal * discountValue) / 100);
    } else {
      return null; // Invalid discount code
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, getSubtotal, applyDiscount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
