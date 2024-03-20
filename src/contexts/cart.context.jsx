import { useReducer } from "react";
import { createContext } from "react";
import { createAction } from "../utils/reducer/reducer.utils";
import { ACTION, CART_ACTION_TYPES } from "../types/cart";

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addOrRemoveItem: () => {},
  cartItemCount: 0,
  clearItemFromCart: () => {},
  cartItemTotal: 0,
});

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
      return {
        ...state,
        cartItems: clearCartItem(state.cartItems, payload),
      };
    default:
      throw new Error(`Unsupported action type: ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartTotal, cartCount }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const addOrRemoveItem = (product, actionType) => {
    let newCartItems = cartItems;

    if (actionType === ACTION.add) {
      newCartItems = addCartItem(cartItems, product);
    } else if (actionType === ACTION.remove) {
      newCartItems = removeCartItem(cartItems, product);
    }

    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (product) => {
    let newCartItems = cartItems;

    newCartItems = clearCartItem(cartItems, product);

    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, {
        isCartOpen: bool,
      })
    );
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addOrRemoveItem,
    cartItems,
    cartCount,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
