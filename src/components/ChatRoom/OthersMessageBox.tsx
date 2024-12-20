import {
  MessageBox,
  MessageContainer,
  MessageTime,
  OthersMessage,
  OthersName,
  OthersProfile,
  ResentMessage,
} from '@/components/ChatRoom/chatRoom.style.ts';
import UserBasicImg from '@/components/common/userBasicImg';
import formatDateForChatMessage from '@/utils/date/formatDateForChatMessage.ts';

const OthersMessageBox = ({
  name,
  messages,
  time,
  img,
}: {
  name: string;
  messages: string[];
  time: string;
  img: string;
}) => {
  return (
    <MessageBox>
      {img ? <OthersProfile src={img} alt='profile' /> : <UserBasicImg />}
      <MessageContainer>
        <OthersName>{name}</OthersName>
        {messages.map((message, index) =>
          index !== messages.length - 1 ? (
            <OthersMessage key={index}>{message}</OthersMessage>
          ) : (
            <ResentMessage key={index}>
              <OthersMessage>{messages[messages.length - 1]}</OthersMessage>
              <MessageTime>{formatDateForChatMessage(time)}</MessageTime>
            </ResentMessage>
          )
        )}
      </MessageContainer>
    </MessageBox>
  );
};

export default OthersMessageBox;
