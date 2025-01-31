import { useNavigate } from 'react-router-dom';
import PostDetailContainer from './PostDetailContainer.tsx';
import Header from '@/components/common/Layout/Header';
import { BackButton } from '@/components/common/Layout/Header/Header.style.ts';
import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';

const PostDetailPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <BackButton onClick={() => navigate('/', { replace: true })}>
          <ArrowLeftIcon />
        </BackButton>
      </Header>
      <PostDetailContainer />
    </>
  );
};

export default PostDetailPage;
