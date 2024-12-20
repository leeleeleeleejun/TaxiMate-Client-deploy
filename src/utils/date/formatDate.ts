const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? '오후' : '오전';
    const adjustedHours = hours % 12 || 12;
    return `${ampm} ${adjustedHours}시 ${minutes}분`;
  };

  if (isSameDate(date, today)) {
    return `오늘 ${formatTime(date)} 쯤`;
  } else if (isSameDate(date, tomorrow)) {
    return `내일 ${formatTime(date)} 쯤`;
  }

  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${month}월 ${day}일(${dayOfWeek}) ${formatTime(date)} 쯤`;
};

export default formatDate;
