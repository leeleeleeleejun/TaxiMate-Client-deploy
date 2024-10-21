import { RegisterData } from '@/types';
import { useNavigate } from 'react-router-dom';
import checkDate from '@/utils/checkDate.ts';
import useErrorHandle from '@/hooks/useErrorHandle.ts';
import { useCreatePostMutation } from '@/api/postApi.ts';

const useCreatePost = (registerData: RegisterData) => {
  const navigate = useNavigate();

  const [createPost, { error }] = useCreatePostMutation();
  useErrorHandle(error);

  return async () => {
    if (!registerData.title.trim()) {
      alert('제목을 입력해 주세요.');
      return;
    }

    if (!registerData.explanation.trim()) {
      alert('간단 설명을 입력해 주세요.');
      return;
    }

    if (!checkDate(registerData.departureTime)) {
      return;
    }

    const formatDate = new Date(
      new Date(registerData.departureTime).getTime() + 1000 * 60 * 60 * 9
    ).toISOString();

    const result = await createPost({
      ...registerData,
      departureTime: formatDate,
    }).unwrap();

    navigate('/posts/' + result.data.partyId);
  };
};

export default useCreatePost;
