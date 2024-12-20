const formatDateForDetailPost = (timestamp: string) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInMilliseconds = now.getTime() - past.getTime();

  const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 5) {
    const year = past.getFullYear();
    const month = String(past.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줌
    const day = String(past.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  } else if (diffInDays > 0) {
    return `${diffInDays}일 전`;
  } else if (diffInHours > 0) {
    return `${diffInHours}시간 전`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}분 전`;
  } else {
    return '방금 전';
  }
};

export default formatDateForDetailPost;
