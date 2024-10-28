import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChatMessage, GroupMessage } from '@/types/chat.ts';
import { useMessageSubscription } from '@/hooks/useMessageSubscription.ts';
import formatChatDate from '@/utils/formatChatDate.ts';

import MyMessageBox from '@/components/ChatRoom/MyMessageBox.tsx';
import OthersMessageBox from '@/components/ChatRoom/OthersMessageBox.tsx';
import {
  MessageListContainer,
  SystemMessage,
} from '@/components/ChatRoom/chatRoom.style.ts';
import GoNewMessageButton from '@/components/ChatRoom/GoNewMessageButton.tsx';

const MessageList = ({
  userId,
  currentPartyId,
  inAppNotificationHandler,
  initialChatMessage,
  checkReceive,
  children,
}: {
  userId: string;
  currentPartyId: string;
  inAppNotificationHandler: (message: ChatMessage) => void;
  initialChatMessage: GroupMessage[];
  checkReceive: (partyId: string, chatId: string) => void;
  children: ReactNode;
}) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [messageList, setMessageList] = useState<GroupMessage[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showUpButton, setShowUpButton] = useState(false);

  const handleNewMessage = (message: ChatMessage) => {
    if (message.partyId === Number(currentPartyId)) {
      chatHandler(message, setMessageList);
      if (message.sender.id !== userId) {
        checkReceive(currentPartyId, message.id);
      }
    } else {
      inAppNotificationHandler(message);
    }
  };

  useMessageSubscription(handleNewMessage);

  useLayoutEffect(() => {
    if (!messageEndRef.current) return;

    const isLastMessageMine =
      messageList.length > 0 &&
      messageList[messageList.length - 1].sender?.id === userId;

    if (isVisible || isLastMessageMine) {
      scrollToBottom();
    } else {
      setShowUpButton(true);
    }
  }, [messageList]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = messageEndRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      setShowUpButton(false);
    }
  }, [isVisible]);

  useEffect(() => {
    scrollToBottom();
  }, [initialChatMessage]);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView();
    }
  };

  return (
    <>
      <MessageListContainer>
        {children}
        {messageList.map((message) =>
          message.type === 'SYSTEM' ? (
            message.chat.map((item) => (
              <SystemMessage key={item}>{item}</SystemMessage>
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
        <div ref={messageEndRef} style={{ height: '2px' }} />
      </MessageListContainer>
      {showUpButton && messageList.length > 0 && (
        <GoNewMessageButton
          img={messageList[messageList.length - 1].sender?.profileImage || ''}
          name={messageList[messageList.length - 1].sender?.nickname || ''}
          message={
            messageList[messageList.length - 1].chat[
              messageList[messageList.length - 1].chat.length - 1
            ]
          }
          onClick={scrollToBottom}
        />
      )}
    </>
  );
};

export default MessageList;

const createDateSeparator = (messageDate: string): GroupMessage => ({
  chat: [messageDate],
  createdAt: '',
  sender: null,
  type: 'SYSTEM',
});

const chatHandler = (
  message: ChatMessage,
  setMessageList: React.Dispatch<React.SetStateAction<GroupMessage[]>>
) => {
  const setMessage = { ...message, chat: [message.message] };
  const messageDate = formatChatDate(message.createdAt);

  setMessageList((prevState) => {
    if (prevState.length === 0) {
      return [createDateSeparator(messageDate), setMessage];
    }

    const lastMessage = prevState[prevState.length - 1];
    const isSameUser = lastMessage.sender?.id === message.sender.id;
    const isSameTime =
      lastMessage.createdAt.slice(0, 16) === message.createdAt?.slice(0, 16);
    const isSameType = lastMessage.type === message.type;
    const isSameDay =
      lastMessage.createdAt.slice(0, 10) === message.createdAt?.slice(0, 10);

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
