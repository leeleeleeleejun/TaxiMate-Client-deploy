import { GroupMessage } from '@/types/chat.ts';
import { SystemMessage } from '@/domains/ChatRoom/components/SystemMessage.tsx';
import MyMessageBox from '@/domains/ChatRoom/components/MessageBox/MyMessageBox.tsx';
import OthersMessageBox from '@/domains/ChatRoom/components/MessageBox/OthersMessageBox.tsx';

const InitialChatMessage = ({
  initialChatMessage,
  userId,
}: {
  initialChatMessage: GroupMessage[];
  userId: string;
}) => {
  return (
    <>
      {initialChatMessage.map((message) =>
        message.type === 'SYSTEM' ? (
          message.chat.map((item, index) => (
            <SystemMessage key={index}>{item}</SystemMessage>
          ))
        ) : message.sender?.id === userId ? (
          <MyMessageBox
            key={message.createdAt}
            messages={message.chat}
            time={message.createdAt}
          />
        ) : (
          <OthersMessageBox
            key={message.createdAt}
            name={message.sender?.nickname || 'user'}
            img={message.sender?.profileImage || ''}
            messages={message.chat}
            time={message.createdAt}
          />
        )
      )}
    </>
  );
};
export default InitialChatMessage;
