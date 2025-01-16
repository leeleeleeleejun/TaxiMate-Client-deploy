import styled from 'styled-components';

export const SearchInput = styled.input`
  width: 100%;

  border: none;
  font-size: 18px;

  &:focus {
    outline: none;
  }
`;
export const SearchListContainer = styled.ul`
  height: calc(100vh - (var(--header-height)));
  border-top: 1px solid var(--color-gray-300);

  overflow-y: auto;
`;
