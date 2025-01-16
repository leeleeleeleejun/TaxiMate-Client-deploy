import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CLIENT_PATH } from '@/constants/path.ts';
import { PostDetail, PostDetailStatus } from '@/types/post.ts';
import {
  useLeaveChatMutation,
  useParticipationChatMutation,
} from '@/api/chatApi.ts';

import {
  ButtonBox,
  JoinButton,
  LeaveButton,
} from './ChatActionButton.style.ts';

const ChatActionButtonBox = ({
  status,
  id,
  refetchFunc,
}: {
  status: PostDetailStatus;
  id: string;
  refetchFunc: () => Promise<PostDetail | undefined>;
}) => {
  const navigate = useNavigate();

  const [participationChat] = useParticipationChatMutation();
  const [leaveChat] = useLeaveChatMutation();
  const isLogin = useSelector((state: RootState) => state.userSlice.isLogin);

  const goChatRoom = () => {
    navigate(CLIENT_PATH.CHAT_ROOM.replace(':chatRoomId', id));
  };

  const participationChatHandler = async () => {
    if (!isLogin) {
      return navigate('/login');
    }
    try {
      await participationChat(id).unwrap();
      goChatRoom();
    } catch {
      refetchFunc();
    }
  };

  const leaveChatHandler = async () => {
    await leaveChat(id).unwrap();
    const result = await refetchFunc();
    if (result?.currentParticipants === 0) {
      navigate('/', { replace: true });
    }
  };

  return (
    <ButtonBox>
      {checkStatus(status) ? (
        <JoinButton onClick={goChatRoom}>채팅방</JoinButton>
      ) : (
        <JoinButton onClick={participationChatHandler}>팟참여</JoinButton>
      )}
      {status === 'PARTICIPATING' && (
        <LeaveButton onClick={leaveChatHandler}>나가기</LeaveButton>
      )}
    </ButtonBox>
  );
};

const checkStatus = (status: PostDetailStatus) => {
  return status === 'PARTICIPATING' || status === 'TERMINATED';
};

export default ChatActionButtonBox;
