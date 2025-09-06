import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // ✅ Add to cart with size
  const addToCart = (product, qty = 1, size) => {
    const itemKey = `${product.id}-${size}`;
    const existing = items.find((i) => i.key === itemKey);

    if (existing) {
      setItems(
        items.map((i) =>
          i.key === itemKey ? { ...i, qty: i.qty + qty } : i
        )
      );
    } else {
      setItems([...items, { ...product, qty, size, key: itemKey }]);
    }
  };

  // ✅ Update quantity
  const updateQty = (key, qty) => {
    if (qty <= 0) {
      removeFromCart(key);
    } else {
      setItems(items.map((i) => (i.key === key ? { ...i, qty } : i)));
    }
  };

  // ✅ Remove from cart
  const removeFromCart = (key) => {
    setItems(items.filter((i) => i.key !== key));
  };

  // ✅ Clear cart
  const clearCart = () => setItems([]);

  // ✅ Calculate total
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQty, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
