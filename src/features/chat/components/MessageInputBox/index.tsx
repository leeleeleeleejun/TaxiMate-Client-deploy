import { useContext, useRef, useState } from 'react';
import { StompContext } from '@/store/StompContext.ts';

import ArrowUpIcon from '@/assets/icons/chat/arrow-up-icon.svg?react';

import sendMessage from '../../utils/sendMessage';
import { Container, Input } from './MessageInputBox.style.ts';
import { logger } from '@/utils/logger.ts';

const MessageInputBox = ({ partyId }: { partyId: string }) => {
  const client = useContext(StompContext);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hiddenInput = useRef<HTMLInputElement>(null);
  const sendMessageFunc = () => {
    if (input.trim()) {
      sendMessage(client, partyId, input);

      setInput('');
      hiddenInput.current?.focus();
      inputRef.current?.focus();
    } else {
      logger.warn('Invalid message or party');
    }
  };

  return (
    <Container>
      <Input
        placeholder={'메세지를 입력해주세요!'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        $inputLineLength={input.split('\n').length}
        ref={inputRef}
      />
      <input
        ref={hiddenInput}
        style={{ position: 'absolute', opacity: 0, height: 0 }}
      />
      <button onClick={sendMessageFunc}>
        <ArrowUpIcon />
      </button>
    </Container>
  );
};

export default MessageInputBox;
