import {
  MessageTime,
  MyMessage,
  MyMessageBoxContainer,
  MyMessageContainer,
  MyResentMessage,
} from './MessageBox.style.ts';
import formatDateForChatMessage from '../../utils/formatDateForChatMessage.ts';

const MyMessageBox = ({
  messages,
  time,
}: {
  messages: string[];
  time: string;
}) => {
  return (
    <MyMessageBoxContainer>
      <MyMessageContainer>
        {messages.map((message, index) =>
          index !== messages.length - 1 ? (
            <MyMessage key={index}>{message}</MyMessage>
          ) : (
            <MyResentMessage key={index}>
              <MessageTime>{formatDateForChatMessage(time)}</MessageTime>
              <MyMessage>{message}</MyMessage>
            </MyResentMessage>
          )
        )}
      </MyMessageContainer>
    </MyMessageBoxContainer>
  );
};

export default MyMessageBox;
