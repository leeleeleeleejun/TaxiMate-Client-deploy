import styled from 'styled-components';

export const Container = styled.ul`
  height: 100%;
  padding: 0 20px;
  overflow: auto;
`;

export const ChatListItemContainer = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

export const ChatListItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;

  & > div {
    overflow: hidden;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  h3 {
    font-weight: var(--weight-semi-bold);
    margin-right: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    height: 20px;
    margin-left: 5px;

    line-height: 20px;
    white-space: nowrap;

    color: var(--color-gray-100);
    font-size: var(--font-semi-micro);
  }
`;

export const MessageContent = styled.p`
  line-height: 1.2;
  overflow: hidden;

  display: -webkit-box;
  display: -ms-flexbox;
  white-space: normal;
  text-overflow: ellipsis;

  word-break: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ChatListItemBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: var(--font-small);
  color: var(--color-gray-100);
`;

export const MessageCounter = styled.span`
  height: 100%;
  margin-left: 20px;
  padding: 3px 5px;
  border-radius: 9px;

  background-color: var(--color-orange);

  font-size: var(--font-semi-micro);
  color: var(--color-white);
`;

export const Divider = styled.div`
  width: 100%;
  background-color: var(--color-gray-300);
  color: var(--color-gray-100);
  padding: 6px 8px;
  font-size: var(--font-small);
  font-weight: var(--weight-medium);
  border-radius: 4px;
  margin-top: 10px;
`;
