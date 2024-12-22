import { SetPlaceProps } from '@/types/props';
import getCurrentLocation from '@/utils/getCurrentlocation.ts';

import CreatePostChilePageLayout from '@/components/common/Layout/CreatePostChildPageLayout';
import SearchBar from '@/components/CreatePost/setPlace/SearchBar.tsx';
import { MyLocationButton } from '@/components/CreatePost/setPlace/setPlace.style.ts';
import ActiveMoveLocationIcon from '@/assets/icons/map/active-move-location-icon.svg?react';
import { useState } from 'react';
import LoadingIcon from '@/components/common/LoadingIcon';

const SetPlacePage = ({
  step,
  setStep,
  setRegisterDataFunc,
  comeBackMain,
}: SetPlaceProps) => {
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

  const isOrigin = step === 'origin';
  const subTitle = (isOrigin ? '어디에서 출발' : '어디로 도착') + '하나요?';

  const setStepFunc = () => {
    setStep(isOrigin ? 'searchOrigin' : 'searchDestination');
  };

  const MyLocationButtonClickHandle = async () => {
    try {
      setIsLoading(true);
      const { lat, lng } = await getCurrentLocation();
      const registerKey = isOrigin ? 'originLocation' : 'destinationLocation';
      setRegisterDataFunc(registerKey, { latitude: lat, longitude: lng });
      isOrigin ? setStep('originMap') : setStep('destinationMap');
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
  };

  return (
    <CreatePostChilePageLayout subTitle={subTitle} backHandle={comeBackMain}>
      {isLoading && <LoadingIcon />}
      <SearchBar setStepFunc={setStepFunc} />
      <MyLocationButton onClick={MyLocationButtonClickHandle}>
        <ActiveMoveLocationIcon />내 위치
      </MyLocationButton>
    </CreatePostChilePageLayout>
  );
};

export default SetPlacePage;
