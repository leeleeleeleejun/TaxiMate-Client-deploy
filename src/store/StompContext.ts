import { createContext } from 'react';
import { Client } from '@stomp/stompjs';

export const StompContext = createContext<null | Client>(null);
