import {
  MessageTime,
  MyMessage,
  MyMessageBoxContainer,
  MyMessageContainer,
  MyResentMessage,
} from '@/components/ChatRoom/chatRoom.style.ts';
import formatMongoDate from '@/utils/formatMongoDate.ts';

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
              <MessageTime>{formatMongoDate(time)}</MessageTime>
              <MyMessage>{message}</MyMessage>
            </MyResentMessage>
          )
        )}
      </MyMessageContainer>
    </MyMessageBoxContainer>
  );
};

export default MyMessageBox;
