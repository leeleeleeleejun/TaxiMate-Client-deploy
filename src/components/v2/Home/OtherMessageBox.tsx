import {
  MessageContainer,
  MessageTime,
  OthersName,
  OthersProfile,
  ResentMessage,
} from '@/components/ChatRoom/chatRoom.style.ts';
import UserBasicImg from '@/components/common/userBasicImg';
import formatMongoDate from '@/utils/formatMongoDate.ts';
import PeopleCountTag from '@/components/common/PeopleCountTag';
import {
  CloseTag,
  ParticipationTag,
} from '@/components/PostDetail/PostDetail.style.ts';
import { PostDetailStatus } from '@/types/post.ts';
import ArrowRightIcon from '@/assets/icons/arrow-right-icon.svg?react';

import {
  MessageBox,
  MessageContent,
  OthersMessage,
  TagBox,
} from '@/components/v2/Home/Home.style.ts';
import useParticipationChatHandler from '@/hooks/v2/useParticipationChatHandler.tsx';

const OthersMessageBox = ({
  id,
  name,
  messages,
  time,
  img,
  status,
  currentParticipants,
  maxParticipants,
  refetchFunc,
}: {
  id: string;
  name: string;
  messages: string;
  time: string;
  img: string;
  status: PostDetailStatus;
  maxParticipants: number;
  currentParticipants: number;
  refetchFunc: () => void;
}) => {
  const participationChatHandler = useParticipationChatHandler(
    status,
    id,
    refetchFunc
  );

  return (
    <MessageBox>
      {img ? <OthersProfile src={img} alt='profile' /> : <UserBasicImg />}
      <MessageContainer>
        <OthersName>{name}</OthersName>
        <ResentMessage>
          <OthersMessage onClick={participationChatHandler}>
            <div>
              <MessageContent>{messages}</MessageContent>
              <TagBox>
                <PeopleCountTag
                  currentParticipants={currentParticipants}
                  maxParticipants={maxParticipants}
                />
                {status === 'PARTICIPATING' && (
                  <ParticipationTag>참여중인 팟</ParticipationTag>
                )}
                {status === 'TERMINATED' && <CloseTag>종료된 팟</CloseTag>}
              </TagBox>
            </div>
            <ArrowRightIcon />
          </OthersMessage>
          <MessageTime>{formatMongoDate(time)}</MessageTime>
        </ResentMessage>
      </MessageContainer>
    </MessageBox>
  );
};

export default OthersMessageBox;
