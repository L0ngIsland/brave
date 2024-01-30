import styled from "styled-components";
import { rotation } from "@/styles/animations";

const Spinner = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: auto auto;
  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid black;
    border-color: black transparent black transparent;
    animation: ${rotation} 1.2s linear infinite;
  }
`;

export default Spinner;
