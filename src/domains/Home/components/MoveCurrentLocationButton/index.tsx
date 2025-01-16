import { MoveCurrentLocationButtonProps } from '@/types/props/index.ts';
import { Button } from './MoveCurrentLocation.style.ts';

import ActiveMoveLocationIcon from '@/assets/icons/map/active-move-location-icon.svg?react';
import NonActiveMoveLocationIcon from '@/assets/icons/map/non-active-move-location-icon.svg?react';

const windowHeight = window.innerHeight;

const MoveCurrentLocationButton = ({
  moveCurrentLocationFunc,
  isActiveMyLocationButton,
  isActivePostItem,
  postListHeight,
}: MoveCurrentLocationButtonProps) => {
  return (
    <Button
      onClick={moveCurrentLocationFunc}
      $bottom={postListHeight}
      $isMax={postListHeight >= Math.floor(windowHeight * 0.9)}
      $activeMarker={isActivePostItem}
    >
      {isActiveMyLocationButton ? (
        <ActiveMoveLocationIcon />
      ) : (
        <NonActiveMoveLocationIcon />
      )}
    </Button>
  );
};

export default MoveCurrentLocationButton;
