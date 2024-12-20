const checkDate = (newDate: string) => {
  const targetDate = new Date(newDate);
  const currentDate = new Date();

  if (currentDate <= targetDate) {
    return true;
  } else {
    alert('올바르지 않은 시각입니다.');
    return false;
  }
};

export default checkDate;
