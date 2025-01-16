import { useGetChatListQuery } from '@/api/chatApi.ts';

import NoData from '@/components/common/NoData.tsx';
import Header from '@/components/common/Layout/Header';
import Footer from '@/components/common/Layout/Footer';
import LoadingIcon from '@/components/common/LoadingIcon';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';

import ChatIcon from '@/assets/icons/chat/chat-icon.svg?react';

import { Container, Divider } from './page.style';
import ChatListWrap from '../components/ChatListWrap';

const ChatListPage = () => {
  const { data, isLoading } = useGetChatListQuery(null, {
    refetchOnFocus: true,
  });

  if (isLoading) return <LoadingIcon />;
  if (!data) return <NoData>데이터를 찾을 수 없습니다</NoData>;

  const progressChatRoom = data.filter((chat) => chat.isProgress);
  const closeChatRoom = data.filter((chat) => !chat.isProgress);

  return (
    <>
      <Header>
        <HeaderItem>
          채팅
          <ChatIcon />
        </HeaderItem>
      </Header>
      {data.length > 0 ? (
        <Container>
          {progressChatRoom.length > 0 && (
            <ChatListWrap chatRoomListProp={progressChatRoom} />
          )}
          {closeChatRoom.length > 0 && (
            <>
              <Divider>종료된 팟</Divider>{' '}
              <ChatListWrap chatRoomListProp={closeChatRoom} />
            </>
          )}
        </Container>
      ) : (
        <NoData>채팅 내역이 없습니다</NoData>
      )}
      <Footer />
    </>
  );
};
export default ChatListPage;
