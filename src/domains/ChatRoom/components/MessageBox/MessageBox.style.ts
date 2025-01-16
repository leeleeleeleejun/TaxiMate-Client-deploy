import styled from 'styled-components';

export const MessageBox = styled.div`
  display: flex;
  max-width: 70%;
  margin-bottom: 10px;
`;

export const MyMessageBoxContainer = styled(MessageBox)`
  margin-left: auto;
`;

export const ResentMessage = styled.div`
  display: flex;
`;

export const MyResentMessage = styled(ResentMessage)`
  margin-left: auto;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MyMessageContainer = styled(MessageContainer)`
  margin-left: auto;
`;

const Message = styled.div`
  width: fit-content;
  padding: 8px 12px;
  margin-bottom: 2px;

  font-size: var(--font-small);
  border-radius: 14px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const OthersMessage = styled(Message)`
  background-color: var(--color-gray-300);
`;

export const MyMessage = styled(Message)`
  margin-left: auto;
  background-color: var(--color-main);
  color: var(--color-white);
`;

export const MessageTime = styled.span`
  margin-top: auto;
  padding: 0 2px 3px;
  color: var(--color-gray-100);
  font-size: var(--font-micro);
  font-weight: var(--weight-regular);
  white-space: nowrap;
`;

export const OthersProfile = styled.img`
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  border-radius: 50%;

  margin-right: 10px;
`;

export const OthersName = styled.span`
  margin-bottom: 5px;

  color: var(--color-gray-100);
  font-size: var(--font-semi-micro);
`;
