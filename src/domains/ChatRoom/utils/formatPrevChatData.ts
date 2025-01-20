import { ChatList, GroupMessage } from '@/types/chat.ts';
import formatDateForSystemMessage from '@/domains/ChatRoom/utils/formatDateForSystemMessage.ts';

const formatPrevChatData = (chatData: ChatList) => {
  const array: GroupMessage[] = [];
  let currentDate = '';

  chatData.chats.forEach((message) => {
    const messageDate = formatDateForSystemMessage(message.createdAt);

    if (messageDate !== currentDate) {
      currentDate = messageDate;
      array.push({
        chat: [currentDate],
        createdAt: '',
        sender: null,
        type: 'SYSTEM',
      });
    }

    const lastMessage = array[array.length - 1];
    const isSameUser = lastMessage.sender?.id === message.sender?.id;
    const isSameTime =
      lastMessage.createdAt.slice(0, 16) === message.createdAt?.slice(0, 16);
    const isSameType = lastMessage.type === message.type;

    if (isSameType && isSameUser && isSameTime) {
      // 이전 메시지와 같은 유저, 같은 시간대의 메시지라면 chat 배열에 추가
      lastMessage.chat.push(message.message);
    } else {
      // 새로운 유저이거나 시간이 다르면 새로운 그룹 추가
      array.push({ ...message, chat: [message.message] });
    }
  });

  return array;
};

export default formatPrevChatData;
