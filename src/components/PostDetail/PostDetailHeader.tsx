import { PostDetailStatus } from '@/types/post.ts';
import * as S from '@/components/PostDetail/PostDetail.style.ts';
import PeopleCountTag from '@/components/common/PeopleCountTag';
import { PostDetailHeaderContainer } from '@/components/PostDetail/PostDetail.style.ts';

const PostDetailHeader = ({
  currentParticipants,
  maxParticipants,
  status,
  createdAt,
  views,
}: {
  currentParticipants: number;
  maxParticipants: number;
  status: PostDetailStatus;
  createdAt: string;
  views: string;
}) => {
  return (
    <PostDetailHeaderContainer>
      <div>
        <PeopleCountTag
          currentParticipants={currentParticipants}
          maxParticipants={maxParticipants}
        />
        {status === 'PARTICIPATING' && (
          <S.ParticipationTag>참여중인 팟</S.ParticipationTag>
        )}
        {status === 'TERMINATED' && <S.CloseTag>종료된 팟</S.CloseTag>}
      </div>
      {createdAt} • 조회 {views}
    </PostDetailHeaderContainer>
  );
};

export default PostDetailHeader;
