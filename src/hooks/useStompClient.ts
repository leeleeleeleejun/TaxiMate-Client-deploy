import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import SockJS from 'sockjs-client';

import { getAccessToken } from '@/api/baseApi.ts';
import { eventBus } from '@/utils/chat/eventBus.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { logger } from '@/utils/logger.ts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const uuid = uuidv4().replace('-', '');

export const useStompClient = (): Client | null => {
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const isLogin = useSelector((state: RootState) => state.userSlice.isLogin);
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!isLogin) {
      logger.log('Access token is missing, STOMP connection skipped.');
      setIsConnected(false);
      return;
    }

    const client = new Client({
      webSocketFactory: () => new SockJS(API_BASE_URL + '/ws'),
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      reconnectDelay: 1000,
      onConnect: () => {
        logger.log('Connected to STOMP');
        setIsConnected(true);
        client.subscribe(
          '/queue/messages/' + uuid,
          (message) => {
            const receivedMessage = JSON.parse(message.body);
            eventBus.publish('newMessage', receivedMessage);
          },
          { Authorization: `Bearer ${accessToken}` }
        );
      },
      onStompError: (frame) => {
        logger.error('STOMP error:', frame);
        setIsConnected(false);
      },
      onDisconnect: () => {
        logger.log('Disconnected from STOMP');
        setIsConnected(false);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      setIsConnected(false);
      client.deactivate();
      clientRef.current = null;
    };
  }, [isLogin]);

  return isConnected ? clientRef.current : null;
};

export default useStompClient;
