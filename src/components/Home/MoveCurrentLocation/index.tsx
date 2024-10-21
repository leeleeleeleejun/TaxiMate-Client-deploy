import { useEffect, useState } from 'react';
import { useNavermaps } from 'react-naver-maps';

import getCurrentLocation from '@/utils/getCurrentlocation.ts';
import { MoveCurrentLocationProps } from '@/types/props/index.ts';

import ActiveMoveLocationIcon from '@/assets/icons/map/active-move-location-icon.svg?react';
import NonActiveMoveLocationIcon from '@/assets/icons/map/non-active-move-location-icon.svg?react';
import { Button } from '@/components/Home/MoveCurrentLocation/MoveCurrentLocation.style.ts';

const windowHeight = window.innerHeight;

const MoveCurrentLocation = ({
  map,
  activeButton,
  setActiveButton,
  activeMarker,
  postListHeight,
  setIsLoading,
}: MoveCurrentLocationProps) => {
  const naverMaps = useNavermaps();

  const [bottom, setBottom] = useState(0);
  const [isMax, setIsMax] = useState(false);

  useEffect(() => {
    if (activeMarker) {
      setBottom(Math.floor(windowHeight * 0.2));
    }
  }, [activeMarker]);

  useEffect(() => {
    checkMax(bottom, setIsMax); // 초기 상태 설정
  }, [bottom]);

  // 자연스러운 애니메이션을 위해 아래에서 위로 나오게
  useEffect(() => {
    setBottom(0);
    return setBottom(postListHeight);
  }, [postListHeight]);

  const moveCurrentLocationFunc = async () => {
    if (map) {
      setIsLoading(true);
      const { lat, lng } = await getCurrentLocation();
      const latLng = new naverMaps.LatLng(lat, lng);
      map.setCenter(latLng);
      setIsLoading(false);
    }
    setActiveButton(true);
  };

  return (
    <Button
      onClick={moveCurrentLocationFunc}
      $bottom={bottom}
      $isMax={isMax}
      $activeMarker={activeMarker}
    >
      {activeButton ? (
        <ActiveMoveLocationIcon />
      ) : (
        <NonActiveMoveLocationIcon />
      )}
    </Button>
  );
};

export default MoveCurrentLocation;

const checkMax = (
  bottom: number,
  setIsMax: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (bottom >= Math.floor(windowHeight * 0.9)) {
    setIsMax(true);
  } else {
    setIsMax(false);
  }
};
