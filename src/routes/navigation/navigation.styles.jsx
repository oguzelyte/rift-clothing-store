import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as RiftLogo } from "../../assets/rift-logo.svg";

export const NavigationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  align-items: center;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 150px;
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
`;

export const NavLink = styled(Link)`
  font-size: 20px;
  cursor: pointer;
`;

export const StyledRiftLogo = styled(RiftLogo)`
  width: 100%;
  height: auto;
`;
