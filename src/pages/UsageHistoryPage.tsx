import { useState } from 'react';

import Header from '@/components/common/Layout/Header';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';
import {
  Button,
  ButtonContainer,
  Container,
  PostListContainer,
} from '@/components/usageHistiory/usageHistory.style.ts';

import UsageHistoryIcon from '@/assets/icons/header/usage-history-icon.svg?react';
import Footer from '@/components/common/Layout/Footer';
import { useGetClosePostsQuery, useGetJoinPostsQuery } from '@/api/localApi.ts';
import PostListItem from '@/components/common/PostListItem';
import reformatDate from '@/utils/reformatDate.ts';
import NoData from '@/components/common/NoData.tsx';
import LoadingIcon from '@/components/common/LoadingIcon';

const UsageHistoryPage = () => {
  const [isActive, setIsActive] = useState('join');

  const getJoinPostsResult = useGetJoinPostsQuery('joinPosts');
  const getClosePostsResult = useGetClosePostsQuery('closePosts');

  const { data, isLoading } =
    isActive === 'join' ? getJoinPostsResult : getClosePostsResult;

  if (isLoading) return <LoadingIcon />;

  return (
    <>
      <Header>
        <HeaderItem>
          이용내역
          <UsageHistoryIcon />
        </HeaderItem>
      </Header>
      <Container>
        <ButtonContainer>
          <Button
            onClick={() => {
              setIsActive('join');
            }}
            $isJoined={isActive === 'join'}
          >
            참여 중인 팟
          </Button>
          <Button
            onClick={() => {
              setIsActive('close');
            }}
            $isJoined={isActive === 'close'}
          >
            종료된 팟
          </Button>
        </ButtonContainer>
        {data && data.length > 0 ? (
          <PostListContainer>
            {data.map((post) => (
              <PostListItem
                key={post.id}
                id={post.id}
                title={post.title}
                currentParticipants={post.currentParticipants}
                maxParticipants={post.maxParticipants}
                departureTime={reformatDate(post.departureTime)}
                origin={post.origin}
                destination={post.destination}
                isClose={isActive === 'close'}
              />
            ))}
          </PostListContainer>
        ) : (
          <NoData>
            {isActive === 'join'
              ? '참여 중인 팟이 없습니다'
              : '종료된 팟이 없습니다'}
          </NoData>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default UsageHistoryPage;
