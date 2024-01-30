'use client'
import { useAlert } from "@/lib/hooks";
import styled from "styled-components";
import { center, baseStyle, redColor, blueColor } from "@/styles/consts";

const AlertContainer = styled.div<{ severity: any }>`
  ${baseStyle}
  ${center}
  width: fit-content;
  position: absolute;
  top: 10px;
  margin: 0 auto;
  background-color: ${(props) => (props.severity==='error' ? redColor : blueColor)};
`;
const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text && type) {
    return <AlertContainer severity={type}>{text}</AlertContainer>;
  } else {
    return <></>;
  }
};

export default AlertPopup;
