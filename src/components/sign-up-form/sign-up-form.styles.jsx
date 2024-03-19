import styled from "styled-components";
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "../button/button.styles";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }

  ${BaseButton},
  ${InvertedButton},
  ${GoogleSignInButton} {
    width: 50%;

    @media (max-width: 480px) {
      width: 100%;
    }
  }
`;
