import { MoveCurrentLocationProps } from '@/types/props/index.ts';
import { Button } from '@/components/Home/MoveCurrentLocation/MoveCurrentLocation.style.ts';

import ActiveMoveLocationIcon from '@/assets/icons/map/active-move-location-icon.svg?react';
import NonActiveMoveLocationIcon from '@/assets/icons/map/non-active-move-location-icon.svg?react';

const windowHeight = window.innerHeight;

const MoveCurrentLocation = ({
  moveCurrentLocationFunc,
  isActiveMyLocationButton,
  activeMarker,
  postListHeight,
}: MoveCurrentLocationProps) => {
  return (
    <Button
      onClick={moveCurrentLocationFunc}
      $bottom={postListHeight}
      $isMax={postListHeight >= Math.floor(windowHeight * 0.9)}
      $activeMarker={activeMarker}
    >
      {isActiveMyLocationButton ? (
        <ActiveMoveLocationIcon />
      ) : (
        <NonActiveMoveLocationIcon />
      )}
    </Button>
  );
};

export default MoveCurrentLocation;
