import { Outlet } from "react-router-dom";
import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
  StyledRiftLogo,
} from "./navigation.styles";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  const isCartOpen = useSelector(selectIsCartOpen);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(signOutStart());
  };

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <StyledRiftLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
