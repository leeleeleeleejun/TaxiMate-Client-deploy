import ChatListItem from '../ChatListItem';
import { useEffect, useState } from 'react';
import { Message, ChatRoom } from '@/types/chat.ts';
import { useMessageSubscription } from '@/hooks/useMessageSubscription.ts';

const ChatListWrap = ({
  chatRoomListProp,
}: {
  chatRoomListProp: ChatRoom[];
}) => {
  const [chatRoomList, setChatRoomList] = useState<ChatRoom[]>([]);

  useEffect(() => {
    setChatRoomList(chatRoomListProp);
  }, []);

  const handleNewMessage = (message: Message) => {
    setChatRoomList((prevList) => {
      if (!prevList) return prevList;

      const targetIndex = prevList.findIndex(
        (chatRoom) => chatRoom.id === message.partyId
      );
      if (targetIndex === -1) return prevList;

      const updatedRoom = {
        ...prevList[targetIndex],
        recentMessage: message.content,
        recentMessageTime: message.createdAt,
        unreadCount: prevList[targetIndex].unreadCount + 1,
      };

      return [
        updatedRoom,
        ...prevList.slice(0, targetIndex),
        ...prevList.slice(targetIndex + 1),
      ];
    });
  };

  useMessageSubscription(handleNewMessage);

  return (
    <>
      {chatRoomList.map((item) => (
        <ChatListItem
          key={item.id}
          title={item.title}
          currentParticipants={item.currentParticipants}
          maxParticipants={item.maxParticipants}
          recentMessage={item.recentMessage}
          recentMessageTime={item.recentMessageTime}
          unreadCount={item.unreadCount}
          isProgress={item.isProgress}
          id={item.id}
        />
      ))}
    </>
  );
};

export default ChatListWrap;
