import { useEffect, useRef } from 'react';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { Container as MapDiv, NaverMap } from 'react-naver-maps';
import { HomeMapProps } from '@/types/props';
import { setCenterLocation } from '@/components/Home/Map/HomeMapSlice.ts';
import getCurrentLocation from '@/utils/getCurrentlocation.ts';
import MarkerContainer from '@/components/common/MarkerContainer';
import UserCurrentLocationMarker from '@/components/common/UserCurrentLocationMarker';

const Map = ({
  map,
  setMap,
  setActiveButton,
  activeMarker,
  setActiveMarker,
  setShowResearchButton,
  data,
}: HomeMapProps) => {
  const dispatch = useDispatch();
  const centerLocation = useSelector(
    (state: RootState) => state.homeMapSlice.centerLocation
  );
  const userCurrentLocation = useRef<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { lat, lng } = await getCurrentLocation();
        userCurrentLocation.current = { lat, lng };
        if (!(centerLocation.lat === lat && centerLocation.lng === lng)) {
          setActiveButton(false);
        }
      } catch (e) {
        setActiveButton(false);
      }
    })();
  }, []);

  const onCenterChangedFunc = async () => {
    if (!map) return;
    // 현재 위치 참조
    const { x, y } = map.getCenter();
    dispatch(setCenterLocation({ lat: y, lng: x }));

    // 내 위치로 이동 버트 비활성화
    setActiveButton(false);
    setShowResearchButton(true);
  };

  return (
    <MapDiv
      className={'map-wrapper'}
      onClick={() => {
        setActiveMarker(null);
      }}
      onMouseUp={onCenterChangedFunc}
      onTouchEnd={onCenterChangedFunc}
    >
      <NaverMap
        defaultCenter={centerLocation}
        defaultZoom={15}
        minZoom={12}
        ref={setMap}
        logoControl={false}
        onZoomChanged={onCenterChangedFunc}
      >
        {userCurrentLocation.current && (
          <UserCurrentLocationMarker position={userCurrentLocation.current} />
        )}
        {data.map((item) => (
          <MarkerContainer
            key={item.id}
            id={item.id}
            position={item.originLocation}
            title={item.destination}
            anchor={[item.destination.length * 6 + 22, 53]}
            showPlace
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
          />
        ))}
      </NaverMap>
    </MapDiv>
  );
};

export default Map;
