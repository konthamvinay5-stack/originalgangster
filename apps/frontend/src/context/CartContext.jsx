import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();
const STORAGE_KEY = 'errorfit_cart_v1';

function readInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setItems(readInitial());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function addToCart(product, qty = 1) {
    setItems(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });
  }

  function updateQty(productId, qty) {
    setItems(prev => prev.map(i => i.id === productId ? { ...i, qty: Math.max(1, qty) } : i));
  }

  function removeFromCart(productId) {
    setItems(prev => prev.filter(i => i.id !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, updateQty, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
