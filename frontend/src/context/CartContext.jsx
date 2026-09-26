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

  const sanitizePrice = (rawPrice) => {
    if (typeof rawPrice === 'number') return rawPrice;
    if (typeof rawPrice === 'string') {
      const clean = parseInt(rawPrice.replace(/[^\d]/g, ''));
      return isNaN(clean) ? 0 : clean;
    }
    return 0;
  };

  const addToCart = (product, qty = 1, size = null) => {
    const numericQty = Number(qty || product?.qty || product?.quantity || 1) || 1;
    const itemSize = size || product?.size || (product?.sizes && product?.sizes[0]) || 8;
    const numericPrice = sanitizePrice(product?.price);
    const prodId = product?._id || product?.id || ('prod_' + Date.now());
    const prodName = product?.name || 'Artisanal Footwear';
    const prodImage = product?.images?.[0] || product?.image || '/Shoes.png';

    const itemExists = cartItems.find((x) => (x._id === prodId || x.id === prodId) && x.size === itemSize);

    if (itemExists) {
      setCartItems(
        cartItems.map((x) =>
          (x._id === prodId || x.id === prodId) && x.size === itemSize
            ? { ...x, qty: x.qty + numericQty }
            : x
        )
      );
    } else {
      const sanitizedProduct = {
        ...product,
        _id: prodId,
        id: prodId,
        name: prodName,
        price: numericPrice,
        image: prodImage,
        images: product?.images || [prodImage],
      };
      setCartItems([...cartItems, { ...sanitizedProduct, qty: numericQty, size: itemSize }]);
    }
  };

  const removeFromCart = (id, size) => {
    setCartItems(cartItems.filter((x) => !((x._id === id || x.id === id) && x.size === size)));
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
