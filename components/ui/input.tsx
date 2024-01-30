import InputMask from "react-input-mask";
import styled from "styled-components";
import { baseStyle, blueColor } from "@/styles/consts";

const Input = styled(InputMask)`
  ${baseStyle}
  &:hover {
    background: ${blueColor};
    color: #174ea6;
  }
`;

export default Input;
