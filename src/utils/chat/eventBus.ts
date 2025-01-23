import { Message } from '@/types/chat.ts';

type Callback = (data: Message) => void;

class EventBus {
  private subscribers: { [key: string]: Callback[] } = {};

  subscribe(event: string, callback: Callback): () => void {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    const index = this.subscribers[event].push(callback) - 1;
    return () => {
      this.subscribers[event].splice(index, 1);
    };
  }

  publish(event: string, data: Message): void {
    if (!this.subscribers[event]) return;
    this.subscribers[event].forEach((callback) => callback(data));
  }
}

export const eventBus = new EventBus();
