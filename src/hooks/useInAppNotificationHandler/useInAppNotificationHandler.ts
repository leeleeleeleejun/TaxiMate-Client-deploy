import { useState, useRef, useEffect } from 'react';
import { WsChat } from '@/types/chat.ts';

const useInAppNotificationHandler = () => {
  const [notification, setNotification] = useState<WsChat | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // 타이머를 저장할 ref

  const handleNewMessage = (message: WsChat) => {
    if (!message) return;

    setNotification(message);
    setShowNotification(true);

    // 기존 타이머가 있으면 초기화
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 3초 후 알림 숨김 처리
    timeoutRef.current = setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // 컴포넌트가 unmount될 때 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    notification,
    showNotification,
    setShowNotification,
    handleNewMessage,
  };
};

export default useInAppNotificationHandler;
