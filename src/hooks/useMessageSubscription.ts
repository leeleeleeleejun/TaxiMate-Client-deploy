import { useEffect } from 'react';
import { eventBus } from '@/utils/chat/eventBus.ts';
import { ChatMessage } from '@/types/chat.ts';

export const useMessageSubscription = (
  callback: (message: ChatMessage) => void
): void => {
  useEffect(() => {
    const unsubscribe = eventBus.subscribe('newMessage', callback);
    return unsubscribe;
  }, [callback]);
};
