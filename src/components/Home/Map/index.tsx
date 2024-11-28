import { Container as MapDiv, NaverMap } from 'react-naver-maps';

import getCurrentLocation from '@/utils/getCurrentlocation.ts';

import MarkerContainer from '@/components/common/MarkerContainer';
import { HomeMapProps } from '@/types/props';

let defaultLocation;

try {
  defaultLocation = await getCurrentLocation();
} catch (error) {
  defaultLocation = { lat: 37.5666103, lng: 126.9783882 };
}
localStorage.setItem('Location', JSON.stringify(defaultLocation));

const Map = ({
  map,
  setMap,
  setActiveButton,
  activeMarker,
  setActiveMarker,
  setShowResearchButton,
  data,
}: HomeMapProps) => {
  const centerLocation = JSON.parse(localStorage.getItem('Location') || '');

  const onCenterChangedFunc = async () => {
    if (!map) return;
    // 현재 위치 참조
    const { x, y } = map.getCenter();
    localStorage.setItem('Location', JSON.stringify({ lat: y, lng: x }));

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
    >
      <NaverMap
        defaultCenter={centerLocation}
        defaultZoom={15}
        minZoom={12}
        ref={setMap}
        onCenterChanged={onCenterChangedFunc}
        logoControl={false}
      >
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
