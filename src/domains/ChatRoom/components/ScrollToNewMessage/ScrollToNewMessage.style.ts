import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  margin: 0 10px 8px;
  gap: 8px;
  align-items: center;

  font-weight: var(--weight-regular);
  box-shadow: 0 0 2px 4px var(--color-gray-300);
  border-radius: 10px;

  & > div {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    & > span {
      color: var(--color-gray-200);
      font-size: var(--font-small);
      white-space: nowrap;
    }
  }

  & > svg {
    flex-shrink: 0;
    margin-right: 10px;
  }
`;
