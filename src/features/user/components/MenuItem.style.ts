import styled from 'styled-components';

export const Container = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  & > div {
    display: flex;
    & > svg {
      margin-right: 8px;
    }
  }
`;
