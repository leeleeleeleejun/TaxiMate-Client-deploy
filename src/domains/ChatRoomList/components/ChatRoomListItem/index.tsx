import { Link } from 'react-router-dom';
import { ChatRoom } from '@/types/chat.ts';
import formatDateForDetailPost from '@/utils/date/formatDateForDetailPost.ts';

import PeopleCountTag from '@/components/common/PeopleCountTag';
import {
  ChatListItemBody,
  ChatListItemContainer,
  ChatListItemHeader,
  MessageContent,
  MessageCounter,
} from './ChatRoomListItem.style.ts';

const ChatRoomListItem = ({
  title,
  currentParticipants,
  maxParticipants,
  recentMessage,
  recentMessageTime,
  unreadCount,
  id,
  isProgress,
}: ChatRoom) => {
  const formatTime = formatDateForDetailPost(recentMessageTime);
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

export default ChatRoomListItem;
