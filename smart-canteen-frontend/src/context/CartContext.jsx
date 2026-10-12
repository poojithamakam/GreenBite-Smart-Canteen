import React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'smartcanteen_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  });

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(items)), [items]);

  function addItem(food) {
    setItems(current => {
      const found = current.find(item => item.id === food.id);
      return found
        ? current.map(item => item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...food, quantity: 1 }];
    });
  }
  function setQuantity(id, quantity) {
    setItems(current => quantity < 1
      ? current.filter(item => item.id !== id)
      : current.map(item => item.id === id ? { ...item, quantity } : item));
  }
  function removeItem(id) { setItems(current => current.filter(item => item.id !== id)); }
  function clearCart() { setItems([]); }

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const value = useMemo(() => ({ items, addItem, setQuantity, removeItem, clearCart, count, subtotal }), [items, count, subtotal]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside CartProvider');
  return value;
}