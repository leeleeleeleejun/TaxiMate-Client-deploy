import {
  GoNewMessageButtonContainer,
  OthersProfile,
} from '@/components/ChatRoom/chatRoom.style.ts';
import UserBasicImg from '@/components/common/userBasicImg';
import { Message } from '@/components/common/InAppNotification/InAppNotification.style.ts';
import ArrowDownIcon from '@/assets/icons/chat/arrow-down-icon.svg?react';

const GoNewMessageButton = ({
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
    <GoNewMessageButtonContainer onClick={onClick}>
      <div>
        {img ? <OthersProfile src={img} alt='profile' /> : <UserBasicImg />}
        <span>{name}</span>
      </div>
      <Message>{message}</Message>
      <ArrowDownIcon />
    </GoNewMessageButtonContainer>
  );
};

export default GoNewMessageButton;
