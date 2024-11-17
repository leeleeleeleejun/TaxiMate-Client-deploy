import { ReactNode, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useGetPostByIdQuery } from '@/api/baseApi.ts';
import useCreatePost from '@/hooks/useCreatePost.ts';
import { RegisterDataKey, RegisterData, StepType } from '@/types';

import CreateMainPage from '@/pages/CreatePostPage/CreateMainPage.tsx';
import SetDatePage from '@/pages/CreatePostPage/SetDatePage.tsx';
import SetPlacePage from '@/pages/CreatePostPage/SetPlacePage.tsx';
import SetPlaceMapPage from '@/pages/CreatePostPage/SetPlaceMapPage.tsx';
import SearchPage from '@/pages/SearchPage.tsx';

const CreatePostPage = () => {
  //  글 수정 기능 주석 처리 (작성했던 데이터 불러오기)
  // const id = useLocation().pathname.split('/')[2];
  // const { data } = useGetPostByIdQuery(id, {
  //   skip: !id, // id가 없으면 쿼리 실행을 건너뜀
  // });
  //
  // const prevPostData: RegisterData = {
  //   title: data?.title || '',
  //   departureTime: data?.departureTime || '',
  //   originLocation: data?.originLocation || { latitude: 0, longitude: 0 },
  //   destinationLocation: data?.destinationLocation || {
  //     latitude: 0,
  //     longitude: 0,
  //   },
  //   explanation: data?.explanation || '',
  //   maxParticipants: String(data?.maxParticipants) || '',
  // };

  const [step, setStep] = useState<StepType>('main');
  const [registerData, setRegisterData] =
    useState<RegisterData>(initialRegisterData);

  const createPostSubmit = useCreatePost(registerData);

  const comeBackMain = () => {
    setStep('main');
  };

  const setRegisterDataFunc = (
    name: RegisterDataKey,
    data: string | { longitude: number; latitude: number }
  ) => {
    setRegisterData((prev) => ({ ...prev, [name]: data }));
  };

  const setPlaceMapPageBackHandle = () => {
    setStep(step === 'originMap' ? 'origin' : 'destination');
  };

  return (
    <>
      <Step check={step === 'main'}>
        <CreateMainPage
          registerData={registerData}
          createPostSubmit={createPostSubmit}
          setRegisterDataFunc={setRegisterDataFunc}
          setStep={setStep}
        />
      </Step>
      <Step check={step === 'time'}>
        <SetDatePage
          value={registerData.departureTime}
          setRegisterDataFunc={setRegisterDataFunc}
          comeBackMain={comeBackMain}
        />
      </Step>
      <Step check={step === 'origin' || step === 'destination'}>
        <SetPlacePage
          step={step}
          setStep={setStep}
          setRegisterDataFunc={setRegisterDataFunc}
          comeBackMain={comeBackMain}
        />
      </Step>
      <Step check={step === 'searchOrigin' || step === 'searchDestination'}>
        <SearchPage
          step={step}
          setStep={setStep}
          setRegisterDataFunc={setRegisterDataFunc}
        />
      </Step>
      <Step check={step === 'originMap' || step === 'destinationMap'}>
        <SetPlaceMapPage
          step={step}
          value={
            step === 'originMap'
              ? registerData.originLocation
              : registerData.destinationLocation
          }
          setRegisterDataFunc={setRegisterDataFunc}
          comeBackMain={comeBackMain}
          backHandle={setPlaceMapPageBackHandle}
        />
      </Step>
    </>
  );
};

export default CreatePostPage;

const Step = ({ check, children }: { check: boolean; children: ReactNode }) => {
  if (check) {
    return children;
  }

  return null;
};

// 상태 초기화 유틸리티 함수
const initialRegisterData: RegisterData = (() => {
  const today = new Date();
  const ceilMinutes = Math.ceil(today.getMinutes() / 5) * 5;
  const departureTime = new Date(today.setMinutes(ceilMinutes)).toISOString();
  const centerLocation = JSON.parse(localStorage.getItem('Location') || '');

  return {
    title: '',
    departureTime,
    explanation: '',
    originLocation: {
      latitude: centerLocation.lat, // 36.4689627,
      longitude: centerLocation.lng, // 127.1408071,
    },
    destinationLocation: {
      latitude: 36.8511811,
      longitude: 127.1511352,
    },
    maxParticipants: '4',
  };
})();
