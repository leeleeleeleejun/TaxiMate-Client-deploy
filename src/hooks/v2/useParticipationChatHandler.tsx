import { useNavigate } from 'react-router-dom';
import { PostDetailStatus } from '@/types/post.ts';
import { useParticipationChatMutation } from '@/api/chatApi.ts';
import useErrorHandle from '@/hooks/useErrorHandle.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const useParticipationChatHandler = (
  status: PostDetailStatus,
  roomId: string,
  refetch: () => void
) => {
  const navigate = useNavigate();
  const [participationChat, { error }] = useParticipationChatMutation();
  const isLogin = useSelector((state: RootState) => state.userSlice.isLogin);
  useErrorHandle(error);

  const participationChatHandler = async () => {
    if (!isLogin) {
      return navigate('/login');
    }
    try {
      const chatRoomUrl = `/chat-list/${roomId}`;

      if (status === 'PARTICIPATING') {
        navigate(chatRoomUrl);
      } else {
        const answer = confirm('팟에 참여하시겠습니까?');
        if (answer) {
          await participationChat(roomId).unwrap();
          navigate(chatRoomUrl);
        }
      }
    } catch {
      refetch();
    }
  };

  return participationChatHandler;
};

export default useParticipationChatHandler;
