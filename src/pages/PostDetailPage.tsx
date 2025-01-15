import { useLocation, useNavigate } from 'react-router-dom';
import { useGetPostByIdQuery } from '@/api/postApi.ts';
import formatDateForDetailPost from '@/utils/date/formatDateForDetailPost.ts';
import { PostDetail } from '@/types/post.ts';

import Header from '@/components/common/Layout/Header';
import LocationInfo from '@/components/common/LocationInfo';
import { BackButton } from '@/components/common/Layout/Header/Header.style.ts';
import Map from '@/components/PostDetail/Map';
import PostDetailHeader from '@/components/PostDetail/PostDetailHeader.tsx';
import PostDetailTitle from '@/components/PostDetail/PostDetailTitle.tsx';
import ParticipantsBox from '@/components/PostDetail/ParticipantsBox.tsx';
import ChatActionButtonBox from '@/components/PostDetail/ChatActionButtonBox.tsx';
import NoData from '@/components/common/NoData.tsx';
import {
  ContentContainer,
  MoveInfoContainer,
  PostDetailContainer,
} from '@/components/PostDetail/PostDetail.style.ts';

import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';
import LoadingIcon from '@/components/common/LoadingIcon';

const PostDetailPage = () => {
  const navigate = useNavigate();
  const id = useLocation().pathname.split('/')[2];
  const { data, isLoading, refetch } = useGetPostByIdQuery(id);

  const refetchFunc = async (): Promise<PostDetail | undefined> => {
    const result = await refetch();
    return result.data;
  };

  if (isLoading) return <LoadingIcon />;
  if (!data) return <NoData>데이터를 찾을 수 없습니다</NoData>;

  const formatCreatedAt = formatDateForDetailPost(data.createdAt);
  return (
    <>
      <Header>
        <BackButton onClick={() => navigate('/', { replace: true })}>
          <ArrowLeftIcon />
        </BackButton>
      </Header>
      <PostDetailContainer>
        <PostDetailHeader
          currentParticipants={data.currentParticipants}
          maxParticipants={data.maxParticipants}
          status={data.status}
          createdAt={formatCreatedAt}
          views={data.views}
        />
        <PostDetailTitle
          title={data.title}
          departureTime={data.departureTime}
        />
        <LocationInfo
          keyWord={'출발지'}
          place={data.origin}
          address={data.originAddress}
        />
        <LocationInfo
          keyWord={'도착지'}
          place={data.destination}
          address={data.destinationAddress}
        />
        <Map taxiRoute={data.taxi.route} />
        <ContentContainer>{data.explanation}</ContentContainer>
        <MoveInfoContainer>
          예상금액<span>{Number(data.taxi.fare).toLocaleString()}원</span>
          소요시간<span>{Math.ceil(Number(data.taxi.duration) / 60)}분</span>
        </MoveInfoContainer>
        <ParticipantsBox participants={[...data.participants]} />
        <ChatActionButtonBox
          status={data.status}
          id={id}
          refetchFunc={refetchFunc}
        />
      </PostDetailContainer>
    </>
  );
};

export default PostDetailPage;
