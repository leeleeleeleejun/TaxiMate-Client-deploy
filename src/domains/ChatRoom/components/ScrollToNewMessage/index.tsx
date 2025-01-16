import UserBasicImg from '@/components/common/userBasicImg';
import { Message } from '@/components/common/InAppNotification/InAppNotification.style.ts';
import ArrowDownIcon from '@/assets/icons/chat/arrow-down-icon.svg?react';

import { Container } from './ScrollToNewMessage.style.ts';
import { OthersProfile } from '../MessageBox/MessageBox.style.ts';

const ScrollToNewMessage = ({
  img,
  name,
  message,
  onClick,
}: {
  img: string;
  name: string;
  message: string;
  onClick: () => void;
}) => {
  return (
    <Container onClick={onClick}>
      <div>
        {img ? <OthersProfile src={img} alt='profile' /> : <UserBasicImg />}
        <span>{name}</span>
      </div>
      <Message>{message}</Message>
      <ArrowDownIcon />
    </Container>
  );
};

export default ScrollToNewMessage;
