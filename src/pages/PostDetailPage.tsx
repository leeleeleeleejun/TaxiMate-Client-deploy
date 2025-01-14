import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import useErrorHandle from '@/hooks/useErrorHandle.ts';

import { useGetPostByIdQuery } from '@/api/postApi.ts';
import {
  useLeaveChatMutation,
  useParticipationChatMutation,
} from '@/api/chatApi.ts';
import { CLIENT_PATH } from '@/constants/path.ts';
import formatDateForDetailPost from '@/utils/date/formatDateForDetailPost.ts';
import { PostDetailStatus } from '@/types/post.ts';

import Header from '@/components/common/Layout/Header';
import LocationInfo from '@/components/common/LocationInfo';
import UserContainer from '@/components/common/UserContainer';
import { BackButton } from '@/components/common/Layout/Header/Header.style.ts';
import Map from '@/components/PostDetail/Map';
import PostDetailHeader from '@/components/PostDetail/PostDetailHeader.tsx';
import PostDetailTitle from '@/components/PostDetail/PostDetailTitle.tsx';
import * as S from '@/components/PostDetail/PostDetail.style';
import NoData from '@/components/common/NoData.tsx';

import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';
import LoadingIcon from '@/components/common/LoadingIcon';

const PostDetailPage = () => {
  const navigate = useNavigate();
  const id = useLocation().pathname.split('/')[2];
  const { data, isLoading, refetch } = useGetPostByIdQuery(id);
  const [participationChat, { error: participationChatError }] =
    useParticipationChatMutation();
  const [leaveChat, { error: leaveChatError }] = useLeaveChatMutation();
  const isLogin = useSelector((state: RootState) => state.userSlice.isLogin);
  const goChatRoom = () => {
    navigate(CLIENT_PATH.CHAT_ROOM.replace(':chatRoomId', id));
  };

  useErrorHandle(leaveChatError);
  useErrorHandle(participationChatError);

  if (isLoading) return <LoadingIcon />;
  if (!data) return <NoData>데이터를 찾을 수 없습니다</NoData>;

  const participationChatHandler = async () => {
    if (!isLogin) {
      return navigate('/login');
    }
    try {
      await participationChat(data.id).unwrap();
      goChatRoom();
    } catch {
      refetch();
    }
  };

  const leaveChatHandler = async () => {
    await leaveChat(data.id).unwrap();
    const result = await refetch();
    if (result.data && result.data.currentParticipants === 0) {
      navigate('/', { replace: true });
    }
  };

  const formatCreatedAt = formatDateForDetailPost(data.createdAt);
  return (
    <>
      <Header>
        <BackButton onClick={() => navigate('/', { replace: true })}>
          <ArrowLeftIcon />
        </BackButton>
      </Header>
      <S.PostDetailContainer>
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
        <S.ContentContainer>{data.explanation}</S.ContentContainer>
        <S.MoveInfoContainer>
          예상금액<span>{Number(data.taxi.fare).toLocaleString()}원</span>
          소요시간<span>{Math.ceil(Number(data.taxi.duration) / 60)}분</span>
        </S.MoveInfoContainer>
        <S.ParticipantsBox>
          {[...data.participants] // 배열의 복사본을 생성
            .sort((a) => (a.role === 'HOST' ? -1 : 1)) // 'HOST'인 데이터를 앞으로 이동
            .map((item) => (
              <UserContainer
                key={item.id}
                img={item.profileImage}
                name={item.nickname}
                isHost={item.role === 'HOST'}
              />
            ))}
        </S.ParticipantsBox>
        <S.ButtonBox>
          {checkStatus(data.status) ? (
            <S.JoinButton onClick={goChatRoom}>채팅방</S.JoinButton>
          ) : (
            <S.JoinButton onClick={participationChatHandler}>
              팟참여
            </S.JoinButton>
          )}
          {data.status === 'PARTICIPATING' && (
            <S.LeaveButton onClick={leaveChatHandler}>나가기</S.LeaveButton>
          )}
        </S.ButtonBox>
      </S.PostDetailContainer>
    </>
  );
};

export default PostDetailPage;

const checkStatus = (status: PostDetailStatus) => {
  return status === 'PARTICIPATING' || status === 'TERMINATED';
};
