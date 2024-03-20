import {
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  RemoveButton,
} from "./checkout-item.styles";
import { ACTION } from "../../types/cart";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useDispatch } from "react-redux";
import {
  addOrRemoveItem,
  clearItemFromCart,
} from "../../store/cart/cart.action";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));
  const addItemHandler = () =>
    dispatch(addOrRemoveItem(cartItem, ACTION.add, cartItems));
  const removeItemHandler = () =>
    dispatch(addOrRemoveItem(cartItem, ACTION.remove, cartItems));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <span className="name"> {name} </span>
      <Quantity>
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </Quantity>
      <span className="price"> ${price} </span>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
