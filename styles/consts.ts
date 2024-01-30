import { css } from "styled-components";

export const boxShadow =
  "rgba(0, 0, 0, 0.2) 0 3px 5px -1px, rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;";
export const textColor = "#3c4043";
export const borderRadius = "5px";
export const redColor = "#c77f8c";
export const blueColor = "#f6f9fe";
export const transition = "${transition}";
export const padding = "15px 25px";

export const baseStyle = css`
  color: ${textColor};
  border-radius: ${borderRadius};
  transition: ${transition};
  box-shadow: ${boxShadow};
  padding: ${padding};
  letter-spacing: 0.5px;
  outline: none;
  border: none;
  width: 100%;
`;

export const center = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
