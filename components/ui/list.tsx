
import styled from "styled-components";

export const List = styled.ul`
  list-style-type: none;
  margin-top: 10px;
  width: 100%;
`;

export const ListItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > button {
    width: min-content;
  }
`;
