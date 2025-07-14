import { renderHook, act } from '@testing-library/react';
import useInAppNotificationHandler from './';
import { WsChat } from '@/types/chat.ts';

describe('useInAppNotificationHandler', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  const mockMessage: WsChat = {
    id: '1',
    partyId: '1',
    partyTitle: '테스트 파티',
    message: '테스트 메시지',
    type: 'MESSAGE',
    createdAt: new Date().toISOString(),
    sender: { id: '1', nickname: '준석', profileImage: '' },
  };

  it('초기 상태는 notification = null, showNotification = false', () => {
    const { result } = renderHook(() => useInAppNotificationHandler());

    expect(result.current.notification).toBeNull();
    expect(result.current.showNotification).toBe(false);
  });

  it('handleNewMessage 호출 시 notification과 showNotification이 설정됨', () => {
    const { result } = renderHook(() => useInAppNotificationHandler());

    act(() => {
      result.current.handleNewMessage(mockMessage);
    });

    expect(result.current.notification).toEqual(mockMessage);
    expect(result.current.showNotification).toBe(true);
  });

  it('handleNewMessage 호출 후 3초 후에 showNotification이 false가 됨', () => {
    const { result } = renderHook(() => useInAppNotificationHandler());

    act(() => {
      result.current.handleNewMessage(mockMessage);
    });

    expect(result.current.showNotification).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.showNotification).toBe(false);
  });

  it('새 메시지가 오면 기존 타이머 초기화 후 다시 시작됨', () => {
    const { result } = renderHook(() => useInAppNotificationHandler());

    act(() => {
      result.current.handleNewMessage(mockMessage);
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    act(() => {
      result.current.handleNewMessage({
        ...mockMessage,
        message: '두 번째 메시지',
      });
    });

    expect(result.current.notification?.message).toBe('두 번째 메시지');

    act(() => {
      vi.advanceTimersByTime(2999);
    });
    expect(result.current.showNotification).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.showNotification).toBe(false);
  });
});
