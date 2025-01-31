import {
  Container,
  ContentContainer,
  MoveInfoContainer,
} from '@/domains/PostDetail/Page/page.style.ts';
import PostDetailHeader from '@/domains/PostDetail/components/PostDetailHeader';
import PostDetailTitle from '@/domains/PostDetail/components/PostDetailTitle';
import LocationInfo from '@/components/common/LocationInfo';
import Map from '@/domains/PostDetail/components/Map';
import ParticipantsBox from '@/domains/PostDetail/components/ParticipantsBox';
import ChatActionButtonBox from '@/domains/PostDetail/components/ChatActionButtonBox';
import { useLocation } from 'react-router-dom';
import { useGetPostByIdQuery } from '@/api/postApi.ts';
import { PostDetail } from '@/types/post.ts';
import NoData from '@/components/common/NoData.tsx';
import formatDateForDetailPost from '@/utils/date/formatDateForDetailPost.ts';
import SuspenseContainer from '@/components/common/SuspenseContainer.tsx';

const PostDetailContainer = () => {
  const id = useLocation().pathname.split('/')[2];
  const { data, isLoading, refetch } = useGetPostByIdQuery(id);

  const refetchFunc = async (): Promise<PostDetail | undefined> => {
    const result = await refetch();
    return result.data;
  };

  if (isLoading) return <SuspenseContainer />;
  if (!data) return <NoData>데이터를 찾을 수 없습니다</NoData>;

  const formatCreatedAt = formatDateForDetailPost(data.createdAt);

  return (
    <Container>
      <PostDetailHeader
        currentParticipants={data.currentParticipants}
        maxParticipants={data.maxParticipants}
        status={data.status}
        createdAt={formatCreatedAt}
        views={data.views}
      />
      <PostDetailTitle title={data.title} departureTime={data.departureTime} />
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
    </Container>
  );
};
export default PostDetailContainer;
