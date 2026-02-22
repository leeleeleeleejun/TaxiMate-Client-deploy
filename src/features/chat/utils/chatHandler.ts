import { WsChat, GroupMessage } from '@/types/chat.ts';
import formatDateForSystemMessage from './formatDateForSystemMessage.ts';
import isSameCompare, { isSameDayFunc } from './isSameCompare.ts';

/**
 * 생성된 날짜 문자열을 기반으로 시스템 메시지 객체를 생성합니다.
 * @param messageDate - 시스템 메시지에 들어갈 날짜 문자열
 * @returns 시스템 메시지 형태의 GroupMessage 객체
 */
const createDateSeparator = (messageDate: string): GroupMessage => ({
  chat: [messageDate],
  createdAt: '',
  sender: null,
  type: 'SYSTEM',
});

/**
 * 전달된 메시지를 GroupMessage 형태로 변환합니다.
 * @param msg - WebSocket으로 받은 단일 채팅 메시지
 * @returns GroupMessage 형태로 가공된 메시지
 */
const transformMessage = (msg: WsChat): GroupMessage => ({
  ...msg,
  chat: [msg.message],
});

/**
 * 마지막 메시지에 새로운 채팅 내용을 병합합니다.
 * @param prev - 이전 메시지 배열
 * @param newMessage - 새로운 WebSocket 메시지
 * @returns 마지막 메시지에 새로운 메시지가 합쳐진 새 배열
 */
const appendChatToLastMessage = (
  prev: GroupMessage[],
  newMessage: WsChat
): GroupMessage[] => {
  const last = prev.at(-1)!;
  const merged = {
    ...last,
    chat: [...last.chat, newMessage.message],
  };
  return [...prev.slice(0, -1), merged];
};

/**
 * 시스템 메시지(날짜 구분선)를 배열에 삽입합니다.
 * @param list - 기존 메시지 배열
 * @param date - 표시할 날짜 문자열
 * @returns 날짜 구분선이 추가된 새 배열
 */
const insertDateSeparator = (list: GroupMessage[], date: string) => [
  ...list,
  createDateSeparator(date),
];

/**
 * 새로운 메시지를 메시지 배열에 추가합니다.
 * @param list - 기존 메시지 배열
 * @param msg - 추가할 메시지
 * @returns 새 메시지가 추가된 배열
 */
const addNewMessage = (list: GroupMessage[], msg: GroupMessage) => [...list, msg];

/**
 * 전달된 메시지를 이전 상태와 비교하여 날짜 구분선 및 병합 여부를 결정하고,
 * 새로운 메시지 배열을 반환합니다.
 * @param prev - 현재 상태의 메시지 리스트
 * @param initial - 최초 렌더링 시 로드된 메시지 리스트
 * @param message - 새로 들어온 WebSocket 메시지
 * @returns 병합 또는 삽입이 완료된 메시지 배열
 */
const groupMessage = (
  prev: GroupMessage[],
  initial: GroupMessage[],
  message: WsChat
): GroupMessage[] => {
  const msg = transformMessage(message);
  const dateLabel = formatDateForSystemMessage(message.createdAt);

  if (prev.length === 0) {
    const isNewDay = !isSameDayFunc(
      initial[initial.length - 1]?.createdAt ?? '',
      message.createdAt
    );
    return isNewDay
      ? [createDateSeparator(dateLabel), msg]
      : [msg];
  }

  const last = prev[prev.length - 1];
  const { isSameUser, isSameTime, isSameType, isSameDay } = isSameCompare(last, message);

  if (isSameUser && isSameTime && isSameType) {
    const updated = appendChatToLastMessage(prev, message);
    return isSameDay
      ? updated
      : insertDateSeparator(updated, dateLabel).concat(msg);
  }

  return isSameDay
    ? addNewMessage(prev, msg)
    : insertDateSeparator(prev, dateLabel).concat(msg);
};

/**
 * WebSocket으로부터 받은 채팅 메시지를 메시지 리스트에 추가하거나 병합하며,
 * 필요 시 날짜 구분선 시스템 메시지를 자동으로 삽입합니다.
 *
 * @param initialChatMessage - 최초 로딩된 메시지 배열 (날짜 비교용)
 * @param message - WebSocket으로 받은 새 메시지
 * @param setMessageList - React 상태 업데이트 함수
 */
const chatHandler = (
  initialChatMessage: GroupMessage[],
  message: WsChat,
  setMessageList: React.Dispatch<React.SetStateAction<GroupMessage[]>>
) => {
  setMessageList((prev) => groupMessage(prev, initialChatMessage, message));
};

export default chatHandler;