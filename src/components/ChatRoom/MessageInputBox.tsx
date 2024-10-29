import {
  MessageInput,
  MessageInputBoxContainer,
} from '@/components/ChatRoom/chatRoom.style.ts';
import { useRef, useState } from 'react';

import ArrowUpIcon from '@/assets/icons/arrow-up-icon.svg?react';

const MessageInputBox = ({
  sendMessage,
  partyId,
}: {
  sendMessage: (partyId: string, message: string) => void;
  partyId: string;
}) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sendMessageFunc = () => {
    if (input.trim()) {
      sendMessage(partyId, input);

      setInput('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <MessageInputBoxContainer>
      <MessageInput
        placeholder={'메세지를 입력해주세요!'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        $inputLineLength={input.split('\n').length}
        ref={inputRef}
      />
      <button onClick={sendMessageFunc}>
        <ArrowUpIcon />
      </button>
    </MessageInputBoxContainer>
  );
};

export default MessageInputBox;
