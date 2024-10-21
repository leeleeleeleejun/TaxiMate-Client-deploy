import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;

  padding: 25px 20px;
`;

export const MenuItemContainer = styled.li`
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
