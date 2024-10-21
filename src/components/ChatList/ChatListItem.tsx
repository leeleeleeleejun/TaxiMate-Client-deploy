import { Link } from 'react-router-dom';

import PeopleCountTag from '@/components/common/PeopleCountTag';
import {
  ChatListItemBody,
  ChatListItemContainer,
  ChatListItemHeader,
  MessageContent,
  MessageCounter,
} from '@/components/ChatList/chatList.style.ts';
import { ChatRoom } from '@/types/chat.ts';
import reformatDetailDate from '@/utils/reformatDetailDate.ts';

const ChatListItem = ({
  title,
  currentParticipants,
  maxParticipants,
  recentMessage,
  recentMessageTime,
  unreadCount,
  id,
  isProgress,
}: ChatRoom) => {
  const formatTime = reformatDetailDate(recentMessageTime);
  return (
    <ChatListItemContainer>
      <Link to={'/chat-list/' + id}>
        <ChatListItemHeader>
          <div>
            <h3>{title}</h3>
            <PeopleCountTag
              currentParticipants={currentParticipants}
              maxParticipants={maxParticipants}
              isClose={!isProgress}
            />
          </div>
          {recentMessageTime && <span>{formatTime}</span>}
        </ChatListItemHeader>
        <ChatListItemBody>
          <MessageContent>{recentMessage}</MessageContent>
          {unreadCount > 0 && (
            <MessageCounter>
              {unreadCount >= 300 ? '300+' : unreadCount}
            </MessageCounter>
          )}
        </ChatListItemBody>
      </Link>
    </ChatListItemContainer>
  );
};

export default ChatListItem;
