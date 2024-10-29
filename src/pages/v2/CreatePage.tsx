import Header from '@/components/common/Layout/Header';
import {
  BackButton,
  HeaderItem,
} from '@/components/common/Layout/Header/Header.style.ts';
import { CreateSubmitButton } from '@/components/CreatePost/createPost.style.ts';

import ArrowLeftIcon from '@/assets/icons/arrow-left-icon.svg?react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/v2/CreatePost/CreatePost.style.ts';
import { useState } from 'react';
import TitleWrap from '@/components/v2/CreatePost/TitleWrap.tsx';
import MemberWrap from '@/components/v2/CreatePost/MemberWrap.tsx';

const CreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('4');

  const createPostSubmit = () => {};

  return (
    <>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </BackButton>
        <HeaderItem>팟 생성</HeaderItem>
        <CreateSubmitButton onClick={createPostSubmit}>
          만들기
        </CreateSubmitButton>
      </Header>
      <Container>
        <TitleWrap value={title} setRegisterDataFunc={setTitle} />
        <MemberWrap
          value={maxParticipants}
          setRegisterDataFunc={setMaxParticipants}
        />
      </Container>
    </>
  );
};

export default CreatePage;
