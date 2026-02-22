import { useContext, useEffect, useRef, useState } from 'react';
import { StompContext } from '@/store/StompContext.ts';

import ArrowUpIcon from '@/assets/icons/chat/arrow-up-icon.svg?react';

import sendMessage from '../../utils/sendMessage';
import { Container, Input } from './MessageInputBox.style.ts';
import { logger } from '@/utils/logger.ts';

const MessageInputBox = ({ partyId }: { partyId: string }) => {
  const client = useContext(StompContext);
  const [input, setInput] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hiddenInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleVisualViewportChange = () => {
      const viewport = window.visualViewport;
      if (!viewport) return;
      
      const keyboardVisible = viewport.height < window.innerHeight - 100;
      if (keyboardVisible) {
        const height = window.innerHeight - viewport.height;
        setKeyboardHeight(height);
      } else {
        setKeyboardHeight(0);
      }
    };

    window.visualViewport?.addEventListener('resize', handleVisualViewportChange);
    window.visualViewport?.addEventListener('scroll', handleVisualViewportChange);

    return () => {
      window.visualViewport?.removeEventListener('resize', handleVisualViewportChange);
      window.visualViewport?.removeEventListener('scroll', handleVisualViewportChange);
    };
  }, []);

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
    <Container $keyboardHeight={keyboardHeight}>
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
