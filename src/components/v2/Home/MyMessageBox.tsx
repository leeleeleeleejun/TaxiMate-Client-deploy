import {
  MyMessageContainer,
  MessageTime,
  MyMessageBoxContainer,
  ResentMessage,
} from '@/components/ChatRoom/chatRoom.style.ts';
import formatMongoDate from '@/utils/formatMongoDate.ts';
import PeopleCountTag from '@/components/common/PeopleCountTag';
import {
  CloseTag,
  ParticipationTag,
} from '@/components/PostDetail/PostDetail.style.ts';
import { PostDetailStatus } from '@/types/post.ts';
import ArrowRightIcon from '@/assets/icons/arrow-right-icon.svg?react';

import {
  MessageContent,
  MyMessage,
  TagBox,
} from '@/components/v2/Home/Home.style.ts';
import useParticipationChatHandler from '@/hooks/v2/useParticipationChatHandler.tsx';

const MyMessageBox = ({
  id,
  messages,
  time,
  status,
  currentParticipants,
  maxParticipants,
  refetchFunc,
}: {
  id: string;
  messages: string;
  time: string;
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
    <MyMessageBoxContainer onClick={participationChatHandler}>
      <MyMessageContainer>
        <ResentMessage>
          <MessageTime>{formatMongoDate(time)}</MessageTime>
          <MyMessage>
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
          </MyMessage>
        </ResentMessage>
      </MyMessageContainer>
    </MyMessageBoxContainer>
  );
};

export default MyMessageBox;
