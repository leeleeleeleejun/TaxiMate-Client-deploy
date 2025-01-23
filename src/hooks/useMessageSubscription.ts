import { useEffect } from 'react';
import { eventBus } from '@/utils/chat/eventBus.ts';
import { WsChat } from '@/types/chat.ts';

export const useMessageSubscription = (
  callback: (message: WsChat) => void
): void => {
  useEffect(() => {
    const unsubscribe = eventBus.subscribe('newMessage', callback);
    return unsubscribe;
  }, [callback]);
};
