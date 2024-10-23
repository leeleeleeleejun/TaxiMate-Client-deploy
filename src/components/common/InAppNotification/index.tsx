import { useState } from 'react';
import { ChatMessage } from '@/types/chat.ts';
import { CLIENT_PATH } from '@/constants/path.ts';
import UserBasicImg from '@/components/common/userBasicImg';
import {
  Container,
  Content,
  Message,
  ProfileImg,
  ProfileName,
  Title,
} from '@/components/common/InAppNotification/InAppNotification.style.ts';

interface Props extends ChatMessage {
  showNotification: boolean;
  setShowNotification: () => void;
}

const InAppNotification = ({
  partyTitle,
  message,
  sender,
  partyId,
  showNotification,
  setShowNotification,
}: Props) => {
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEndY(e.changedTouches[0].clientY);

    // 위로 드래그되었는지 감지 (음수로 떨어지는 것을 고려)
    if (touchStartY - touchEndY > 50) {
      setShowNotification();
    }
  };

  return (
    <Container
      to={CLIENT_PATH.CHAT_ROOM.replace(':chatRoomId', String(partyId))}
      onClick={setShowNotification}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      $show={showNotification}
    >
      {sender.profileImage ? (
        <ProfileImg src={sender.profileImage} />
      ) : (
        <UserBasicImg />
      )}
      <Content>
        <Title>{partyTitle}</Title>
        <ProfileName>{sender.nickname || 'user'}</ProfileName>
        <Message>{message}</Message>
      </Content>
    </Container>
  );
};
export default InAppNotification;
