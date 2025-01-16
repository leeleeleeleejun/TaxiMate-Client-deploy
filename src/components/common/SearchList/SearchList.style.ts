import styled from 'styled-components';

export const SearchListContainer = styled.ul`
  height: calc(100vh - (var(--header-height)));
  border-top: 1px solid var(--color-gray-300);

  overflow-y: auto;
`;

export const SearchListItemContainer = styled.li`
  display: flex;
  flex-direction: column;

  margin: 0 10px;
  padding: 20px 10px;
  border-bottom: 1px solid var(--color-gray-300);

  div {
    display: flex;

    font-weight: var(--weight-semi-bold);

    svg {
      margin-right: 5px;
    }
  }

  & > span {
    padding-top: 5px;
    padding-left: 18px;

    color: var(--color-gray-100);
    font-size: var(--font-small);
    font-weight: var(--weight-regular);
  }
`;

export const MatchText = styled.span`
  color: var(--color-blue);
`;
