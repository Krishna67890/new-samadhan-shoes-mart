import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
  );

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty, size) => {
    // Ensure qty is a Number to avoid NaN issues
    const numericQty = Number(qty);
    const numericPrice = Number(product.price);

    const itemExists = cartItems.find((x) => x._id === product._id && x.size === size);

    if (itemExists) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id && x.size === size ? { ...x, qty: x.qty + numericQty } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, price: numericPrice, qty: numericQty, size }]);
    }
  };

  const removeFromCart = (id, size) => {
    setCartItems(cartItems.filter((x) => !(x._id === id && x.size === size)));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
