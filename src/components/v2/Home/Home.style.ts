import styled from 'styled-components';

export const Main = styled.main`
  height: 100%;
  overflow: auto;
  border-top: 1px solid var(--color-gray-300);
  padding: 10px 20px 0;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;

export const MessageBox = styled.div`
  display: flex;
  max-width: 80%;
  margin-bottom: 10px;
`;

const Message = styled.div`
  display: flex;
  padding: 8px 6px 8px 12px;
  margin-bottom: 2px;

  font-size: var(--font-small);
  font-weight: var(--weight-semi-bold);

  border-radius: 14px;

  & > div {
    display: flex;
    flex-direction: column;
  }

  & > svg {
    min-width: 18px;
    margin-left: 6px;
  }
`;

export const OthersMessage = styled(Message)`
  background-color: var(--color-gray-300);
`;

export const MyMessage = styled(Message)`
  margin-left: auto;
  background-color: var(--color-main);
  color: var(--color-white);
`;

export const MessageContent = styled.div`
  line-height: 1.2;

  max-height: 32px;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  white-space: normal;
  text-overflow: ellipsis;
  word-break: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const TagBox = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 6px;
`;
