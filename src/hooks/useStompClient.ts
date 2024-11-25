import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import SockJS from 'sockjs-client';

import { getAccessToken } from '@/api/baseApi.ts';
import { eventBus } from '@/utils/eventBus.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const uuid = uuidv4().replace('-', '');

export const useStompClient = (): Client | null => {
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const isLogin = useSelector((state: RootState) => state.userSlice.isLogin);
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!isLogin) {
      console.log('Access token is missing, STOMP connection skipped.');
      setIsConnected(false);
      return;
    }

    const client = new Client({
      webSocketFactory: () => new SockJS(API_BASE_URL + '/ws'),
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Connected to STOMP');
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
        console.error(frame);
        setIsConnected(false);
      },
      onDisconnect: () => {
        console.log('Disconnected');
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
