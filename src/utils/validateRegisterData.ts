import { RegisterData } from '@/types';
import checkDate from '@/utils/date/checkDate.ts';

const validateRegisterData = (registerData: RegisterData) => {
  const {
    title,
    explanation,
    originLocation,
    destinationLocation,
    departureTime,
  } = registerData;

  if (!title.trim()) {
    alert('제목을 입력해 주세요.');
    return;
  }

  if (!explanation.trim()) {
    alert('간단 설명을 입력해 주세요.');
    return;
  }

  if (JSON.stringify(originLocation) === JSON.stringify(destinationLocation)) {
    alert('출발지와 도착지가 동일합니다.');
    return;
  }

  if (!checkDate(departureTime)) {
    return;
  }

  return true;
};

export default validateRegisterData;
