import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useContext } from "react";
import { ACTION, CartContext } from "../../contexts/cart.context";
import { Footer, Image, ProductCardContainer } from "./product-card.styles";
const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addOrRemoveItem } = useContext(CartContext);
  const addProductToCart = () => {
    addOrRemoveItem(product, ACTION.add);
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
