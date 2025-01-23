import { useEffect } from 'react';
import { eventBus } from '@/utils/chat/eventBus.ts';
import { Message } from '@/types/chat.ts';

export const useMessageSubscription = (
  callback: (message: Message) => void
): void => {
  useEffect(() => {
    const unsubscribe = eventBus.subscribe('newMessage', callback);
    return unsubscribe;
  }, [callback]);
};
