import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SearchBarWrapper = styled(Link)`
  position: absolute;
  z-index: 2;
  top: 20px;
  left: 5%;
  right: 5%;
  box-shadow: 0 0 2px 2px var(--color-gray-300);

  height: 46px;
  padding: 14px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: var(--color-white);
  border-radius: 8px;
`;

export const SearchBarContainer = styled.div`
  width: 90%;
  font-size: var(--font-small);

  border: none;
  border-radius: 8px;

  color: var(--color-gray-200);

  text-align: left;
`;
