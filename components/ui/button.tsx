import styled from "styled-components";
import { blueColor, baseStyle } from "@/styles/consts";

const Button = styled.button<{ $primary?: boolean }>`
  ${baseStyle}
  cursor: pointer;
  background-color: white;
  &:hover {
    background: ${blueColor};
    color: #174ea6;
  }
`;

export default Button;
