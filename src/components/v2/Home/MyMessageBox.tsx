import {
  MessageContainer,
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

const MyMessageBox = ({
  messages,
  time,
  status,
}: {
  messages: string;
  time: string;
  status: PostDetailStatus;
}) => {
  return (
    <MyMessageBoxContainer>
      <MessageContainer>
        <ResentMessage>
          <MessageTime>{formatMongoDate(time)}</MessageTime>
          <MyMessage>
            <div>
              <MessageContent>{messages}</MessageContent>
              <TagBox>
                <PeopleCountTag currentParticipants={4} maxParticipants={3} />
                {status === 'PARTICIPATING' && (
                  <ParticipationTag>참여중인 팟</ParticipationTag>
                )}
                {status === 'TERMINATED' && <CloseTag>종료된 팟</CloseTag>}
              </TagBox>
            </div>
            <ArrowRightIcon />
          </MyMessage>
        </ResentMessage>
      </MessageContainer>
    </MyMessageBoxContainer>
  );
};

export default MyMessageBox;
