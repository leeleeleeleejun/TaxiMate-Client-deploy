import { Chat, GroupMessage } from '@/types/chat.ts';

export const isSameDayFunc = (day1: string, day2: string) => {
  return day1.slice(0, 10) === day2.slice(0, 10);
};

const isSameCompare = (prevMessage: GroupMessage, currentMessage: Chat) => {
  const isSameUser = prevMessage.sender?.id === currentMessage?.sender?.id;
  const isSameTime =
    prevMessage.createdAt.slice(0, 16) ===
    currentMessage.createdAt?.slice(0, 16);
  const isSameType = prevMessage.type === currentMessage.type;
  const isSameDay = isSameDayFunc(
    prevMessage.createdAt,
    currentMessage.createdAt
  );

  return { isSameUser, isSameTime, isSameType, isSameDay };
};

export default isSameCompare;
