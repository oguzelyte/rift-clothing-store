import {
  BaseButton,
  ButtonSpinner,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles"; // Adjust the path as necessary

export const BUTTON_COMPONENTS = {
  base: BaseButton,
  google: GoogleSignInButton,
  inverted: InvertedButton,
};

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google",
  inverted: "inverted",
};

const Button = ({
  children,
  buttonType = BUTTON_TYPE_CLASSES.base,
  isLoading,
  ...otherProps
}) => {
  const CustomButton = BUTTON_COMPONENTS[buttonType];
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
