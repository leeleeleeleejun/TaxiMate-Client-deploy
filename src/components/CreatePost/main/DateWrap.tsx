import { ContentWrapProps } from '@/types/props';
import formatDate from '@/utils/date/formatDate.ts';

import ContentWrap from '@/components/CreatePost/ContentWrap.tsx';
import { DepartureTimeContainer } from '@/components/CreatePost/createPost.style.ts';

import ClockIcon from '@/assets/icons/createPost/clock-icon.svg?react';
import ArrowRightIcon from '@/assets/icons/common/arrow-right-icon.svg?react';
import CalendarIcon from '@/assets/icons/createPost/calendar-icon.svg?react';

const DateWrap = ({ value, setStep }: ContentWrapProps) => {
  if (!setStep) return null;
  if (typeof value !== 'string') return null;

  return (
    <ContentWrap theme={'출발 시간'} SvgIcon={ClockIcon}>
      <DepartureTimeContainer
        onClick={() => {
          setStep('time');
        }}
      >
        <div>
          <CalendarIcon />
          {formatDate(value)}
        </div>
        <ArrowRightIcon />
      </DepartureTimeContainer>
    </ContentWrap>
  );
};

export default DateWrap;
