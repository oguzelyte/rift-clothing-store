import { createContext, useState } from "react";

export const ACTION = {
  add: "ADD",
  remove: "REMOVE",
};

const addCartItem = (cartItems, product) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === product.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

const removeCartItem = (cartItems, product) => {
  if (product.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== product.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === product.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, product) => {
  return cartItems.filter((cartItem) => cartItem.id !== product.id);
};

const updateCartItemCount = (updatedCartItems) => {
  const updatedCartItemCount = updatedCartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  return updatedCartItemCount;
};

const newCartTotal = (updatedCartItems) => {
  const newCartTotalPrice = updatedCartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );

  return newCartTotalPrice;
};
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addOrRemoveItem: () => {},
  cartItemCount: 0,
  clearItemFromCart: () => {},
  cartItemTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItemTotal, setCartItemTotal] = useState(0);

  const addOrRemoveItem = (product, actionType) => {
    let updatedCartItems = cartItems;

    if (actionType === ACTION.add) {
      updatedCartItems = addCartItem(cartItems, product);
    } else if (actionType === ACTION.remove) {
      updatedCartItems = removeCartItem(cartItems, product);
    }

    setCartItems(updatedCartItems);
    setCartItemCount(updateCartItemCount(updatedCartItems));
    setCartItemTotal(newCartTotal(updatedCartItems));
  };

  const clearItemFromCart = (product) => {
    let updatedCartItems = cartItems;

    updatedCartItems = clearCartItem(cartItems, product);

    setCartItems(updatedCartItems);
    setCartItemCount(updateCartItemCount(updatedCartItems));
    setCartItemTotal(newCartTotal(updatedCartItems));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addOrRemoveItem,
    cartItems,
    cartItemCount,
    clearItemFromCart,
    cartItemTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
