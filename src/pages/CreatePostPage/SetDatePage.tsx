import { useState } from 'react';
import { parseAbsoluteToLocal } from '@internationalized/date';

import { SetDatePageProps } from '@/types/props';
import reformatDate from '@/utils/reformatDate.ts';
import setDepartureTimeValueFunc from '@/utils/setDepartureTimeValueFunc.ts';

import CreatePostChilePageLayout from '@/components/common/Layout/CreatePostChildPageLayout';
import DatePickerWrap from '@/components/CreatePost/setDate/DatePickerWrap.tsx';
import TimePickerWrap from '@/components/CreatePost/setDate/TimePickerWrap.tsx';
import {
  Container,
  DateStringContainer,
} from '@/components/CreatePost/setDate/setDate.style.ts';
import { SubmitButton } from '@/components/CreatePost/createPost.style.ts';
import checkDate from '@/utils/checkDate.ts';

const SetDatePage = ({
  value,
  setRegisterDataFunc,
  comeBackMain,
}: SetDatePageProps) => {
  const dateDepartureTimeValue = new Date(value);

  const [date, setDate] = useState(
    parseAbsoluteToLocal(dateDepartureTimeValue.toISOString())
  );

  const [time, setTime] = useState(getTimeInitialState(dateDepartureTimeValue));

  const newDate = setDepartureTimeValueFunc(
    date.toString(),
    time
  ).toISOString();

  const submitTimeFunc = () => {
    if (checkDate(newDate)) {
      setRegisterDataFunc('departureTime', newDate);
      comeBackMain();
    }
  };

  return (
    <CreatePostChilePageLayout
      subTitle={'언제 출발하나요?'}
      backHandle={comeBackMain}
    >
      <Container>
        <DateStringContainer>{reformatDate(newDate)}</DateStringContainer>
        <DatePickerWrap date={date} setDate={setDate} />
        <TimePickerWrap time={time} setTime={setTime} />
        <SubmitButton onClick={submitTimeFunc}>완료</SubmitButton>
      </Container>
    </CreatePostChilePageLayout>
  );
};

export default SetDatePage;

// 시간 초기값 설정 유틸리티 함수
const getTimeInitialState = (dateDepartureTimeValue: Date) => ({
  meridiem: dateDepartureTimeValue.getHours() < 12 ? 'AM' : 'PM',
  hour: (dateDepartureTimeValue.getHours() % 12 || 12).toString(),
  minute: (Math.ceil(dateDepartureTimeValue.getMinutes() / 5) * 5).toString(),
});
