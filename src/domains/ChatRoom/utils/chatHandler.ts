import { WsChat, GroupMessage } from '@/types/chat.ts';
import formatDateForSystemMessage from '@/domains/ChatRoom/utils/formatDateForSystemMessage.ts';
import isSameCompare, { isSameDayFunc } from './isSameCompare.ts';

const createDateSeparator = (messageDate: string): GroupMessage => ({
  chat: [messageDate],
  createdAt: '',
  sender: null,
  type: 'SYSTEM',
});

const chatHandler = (
  initialChatMessage: GroupMessage[],
  message: WsChat,
  setMessageList: React.Dispatch<React.SetStateAction<GroupMessage[]>>
) => {
  const setMessage = { ...message, chat: [message.message] };
  const messageDate = formatDateForSystemMessage(message.createdAt);

  setMessageList((prevState) => {
    if (prevState.length === 0) {
      if (
        !isSameDayFunc(
          initialChatMessage[initialChatMessage.length - 1].createdAt,
          message.createdAt
        )
      ) {
        return [createDateSeparator(messageDate), setMessage];
      }
      return [setMessage];
    }

    const lastMessage = prevState[prevState.length - 1];
    const { isSameUser, isSameTime, isSameType, isSameDay } = isSameCompare(
      lastMessage,
      message
    );

    if (isSameType && isSameUser && isSameTime) {
      const updatedMessage = {
        ...lastMessage,
        chat: [...lastMessage.chat, ...setMessage.chat],
      };
      // 날짜가 다른 경우 날짜 구분선 추가
      if (!isSameDay) {
        return [
          ...prevState.slice(0, prevState.length - 1),
          updatedMessage,
          createDateSeparator(messageDate),
          setMessage,
        ];
      }

      return [...prevState.slice(0, prevState.length - 1), updatedMessage];
    }

    // 새로운 날짜의 메시지인 경우
    if (!isSameDay) {
      return [...prevState, createDateSeparator(messageDate), setMessage];
    }
    return [...prevState, setMessage];
  });
};

export default chatHandler;
