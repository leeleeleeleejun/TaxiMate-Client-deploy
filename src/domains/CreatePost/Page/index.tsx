import { ReactNode, useState } from 'react';
import { defaultLocation } from '@/utils/getCurrentlocation.ts';
import { RegisterDataKey, RegisterData, StepType } from '@/types';

import CreateMainPage from '@/domains/CreatePost/Page/CreateMainPage/CreateMainPage.tsx';
import SetDatePage from './SetDatePage/SetDatePage.tsx';
import SetPlacePage from '@/domains/CreatePost/Page/SetPlacePage/SetPlacePage.tsx';
import SetPlaceMapPage from './SetPlaceMapPage/SetPlaceMapPage.tsx';
import SearchPage from './SearchPage/SearchPage.tsx';

// 출발지 초기 위치
const { lat: latitude, lng: longitude } = await defaultLocation();

const CreatePostPage = () => {
  const [step, setStep] = useState<StepType>('main');
  const [registerData, setRegisterData] = useState<RegisterData>(() => {
    const today = new Date();
    const ceilMinutes = Math.ceil(today.getMinutes() / 5) * 5;
    const departureTime = new Date(today.setMinutes(ceilMinutes)).toISOString();

    return {
      title: '',
      departureTime,
      explanation: '',
      originLocation: {
        latitude,
        longitude,
      },
      destinationLocation: {
        latitude: 36.8511811,
        longitude: 127.1511352,
      },
      maxParticipants: '4',
    };
  });

  // 출도착지 내 위치로 선택할 경우 지도에 현위치 마커 표시
  const [isMyLocationSelected, setIsMyLocationSelected] = useState(false);
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
          setIsMyLocationSelected={setIsMyLocationSelected}
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
          isMyLocationSelected={isMyLocationSelected}
          setIsMyLocationSelected={setIsMyLocationSelected}
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
