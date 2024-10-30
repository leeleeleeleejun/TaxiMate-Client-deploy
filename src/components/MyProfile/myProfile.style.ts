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

export const EventExplain = styled.p`
    padding-left: 6px;
    font-size: 13px;
    font-weight: var(--weight-regular);
    color: var(--color-gray-100);
`

export const Bold = styled.strong`
    font-weight: var(--weight-bold);
    color: black;
`

export const SubmitButton = styled.button`
    margin-left: auto;
    max-width: 100px;
    padding: 8px 16px;
    border-radius: 6px;
    background-color: var(--color-main);

    color: var(--color-white);
`