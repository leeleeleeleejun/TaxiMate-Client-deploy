import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { WsChat, GroupMessage } from '@/types/chat.ts';
import { useMessageSubscription } from '@/hooks/useMessageSubscription.ts';

import { SystemMessage } from '../SystemMessage.tsx';
import ScrollToNewMessage from '../ScrollToNewMessage';
import { Container } from './MessageList.style.ts';
import MyMessageBox from '../MessageBox/MyMessageBox.tsx';
import OthersMessageBox from '../MessageBox/OthersMessageBox.tsx';
import chatHandler from '../../utils/chatHandler.ts';
import checkReceive from '../../utils/checkReceive.ts';
import { Client } from '@stomp/stompjs';

interface MessageListProps {
  client: Client | null;
  userId: string;
  currentPartyId: string;
  inAppNotificationHandler: (message: WsChat) => void;
  initialChatMessage: GroupMessage[];
  children: ReactNode;
}

const MessageList = ({
  client,
  userId,
  currentPartyId,
  inAppNotificationHandler,
  initialChatMessage,
  children,
}: MessageListProps) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [messageList, setMessageList] = useState<GroupMessage[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showUpButton, setShowUpButton] = useState(false);

  const handleNewMessage = (message: WsChat) => {
    if (String(message.partyId) === currentPartyId) {
      chatHandler(initialChatMessage, message, setMessageList);
      if (message.sender.id !== userId) {
        checkReceive(client, currentPartyId, message.id);
      }
    } else {
      inAppNotificationHandler(message);
    }
  };

  useMessageSubscription(handleNewMessage);

  useLayoutEffect(() => {
    // 마지막 메세지가 나의 것일 경우 아래로 스크롤
    const handleMessageScrolling = () => {
      if (!messageEndRef.current) return;

      const isLastMessageMine =
        messageList.length > 0 &&
        messageList[messageList.length - 1].sender?.id === userId;

      if (isVisible || isLastMessageMine) {
        scrollToBottom();
      } else {
        setShowUpButton(true);
      }
    };

    handleMessageScrolling();
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
    // refatch 했을 경우 모두 initialChatMessage로 초기화
    scrollToBottom();
    setMessageList([]);
  }, [initialChatMessage]);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView();
    }
  };

  return (
    <>
      <Container>
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
      </Container>
      {showUpButton && messageList.length > 0 && (
        <ScrollToNewMessage
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
