import styled from "styled-components";
import { baseStyle, center } from "@/styles/consts";
import { slideIn } from "@/styles/animations";


export const CardContainer = styled.div`
  ${baseStyle}
  width: 800px;
  animation: ${slideIn} 1s ease-in-out;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

export const CardContent = styled.div`
  ${center}
`;
