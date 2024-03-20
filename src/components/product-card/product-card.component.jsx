import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { Footer, Image, ProductCardContainer } from "./product-card.styles";
import { ACTION } from "../../types/cart";
import { useDispatch, useSelector } from "react-redux";
import { addOrRemoveItem } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => {
    dispatch(addOrRemoveItem(product, ACTION.add, cartItems));
  };

  return (
    <ProductCardContainer>
      <Image src={imageUrl} alt={name} />
      <Footer>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
