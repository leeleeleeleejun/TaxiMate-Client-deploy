import { useNavigate } from 'react-router-dom';
import { CreateMainPageProps } from '@/types/props';
import { useCreatePostMutation } from '@/api/postApi.ts';
import validateRegisterData from '@/utils/validateRegisterData.ts';

import Header from '@/components/common/Layout/Header';
import TitleWrap from '@/components/CreatePost/main/TitleWrap.tsx';
import DateWrap from '@/components/CreatePost/main/DateWrap.tsx';
import PlaceInfoWrap from '@/components/CreatePost/main/PlaceInfoWrap.tsx';
import MemberWrap from '@/components/CreatePost/main/MemberWrap.tsx';
import ExplanationWrap from '@/components/CreatePost/main/ExplanationWrap.tsx';
import {
  BackButton,
  HeaderItem,
} from '@/components/common/Layout/Header/Header.style.ts';
import {
  Container,
  CreateSubmitButton,
} from '@/components/CreatePost/createPost.style.ts';
import LoadingIcon from '@/components/common/LoadingIcon';

import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';

const CreateMainPage = ({
  registerData,
  setRegisterDataFunc,
  setStep,
}: CreateMainPageProps) => {
  const navigate = useNavigate();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const createPostSubmit = async () => {
    if (!validateRegisterData(registerData) || isLoading) return;
    const formatDate = new Date(
      new Date(registerData.departureTime).getTime() + 1000 * 60 * 60 * 9
    ).toISOString();

    try {
      const result = await createPost({
        ...registerData,
        departureTime: formatDate,
      }).unwrap();

      navigate('/posts/' + result.data.partyId, { replace: true });
    } catch (err) {
      console.error('Post creation failed:', err);
      alert('게시글 생성 중 문제가 발생했습니다.');
    }
  };

  return (
    <>
      <Header>
        <BackButton onClick={() => navigate('/', { replace: true })}>
          <ArrowLeftIcon />
        </BackButton>
        <HeaderItem>팟 생성</HeaderItem>
        <CreateSubmitButton onClick={createPostSubmit}>
          만들기
        </CreateSubmitButton>
      </Header>
      <Container>
        {isLoading && <LoadingIcon />}
        <TitleWrap
          value={registerData.title}
          setRegisterDataFunc={setRegisterDataFunc}
        />
        <DateWrap value={registerData.departureTime} setStep={setStep} />
        <PlaceInfoWrap
          value={registerData.originLocation}
          value2={registerData.destinationLocation}
          setStep={setStep}
        />
        <MemberWrap
          value={registerData.maxParticipants}
          setRegisterDataFunc={setRegisterDataFunc}
        />
        <ExplanationWrap
          value={registerData.explanation}
          setRegisterDataFunc={setRegisterDataFunc}
        />
      </Container>
    </>
  );
};

export default CreateMainPage;
