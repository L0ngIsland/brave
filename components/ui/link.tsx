import { redColor, textColor } from "@/styles/consts";
import Link from "next/link";
import styled from "styled-components";

const NavLink = styled(Link)`
  color: ${textColor};
  position: relative;
  text-decoration: none;
  padding-bottom: 2px;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background-color: ${redColor};
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  &:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }
`;

export default NavLink;
