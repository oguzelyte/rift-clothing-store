import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
import {
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  RemoveButton,
} from "./checkout-item.styles";
import { ACTION } from "../../types/cart";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { clearItemFromCart, addOrRemoveItem } = useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);
  const addItemHandler = () => addOrRemoveItem(cartItem, ACTION.add);
  const removeItemHandler = () => addOrRemoveItem(cartItem, ACTION.remove);

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
