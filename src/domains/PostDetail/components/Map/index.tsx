import { useEffect, useState } from 'react';
import { Container as MapDiv, NaverMap, useNavermaps } from 'react-naver-maps';

import MarkerContainer from '@/components/common/MarkerContainer';
import NoData from '@/components/common/NoData.tsx';
import { OpenNaverMapAppBtn } from '@/domains/PostDetail/Page/page.style.ts';

const Map = ({
  taxiRoute,
  handleOpenNaverMapApp,
}: {
  taxiRoute: { latitude: number; longitude: number }[];
  handleOpenNaverMapApp: VoidFunction;
}) => {
  const navermaps = useNavermaps();

  const [map, setMap] = useState<naver.maps.Map | null>(null);

  const polylinePath = taxiRoute.map(
    (item) => new navermaps.LatLng(item.latitude, item.longitude)
  );

  map &&
    new naver.maps.Polyline({
      map: map,
      path: polylinePath,
    });

  /**
   * 첫 번째와 마지막 위치웨 출발, 도착 마커 표시
   */
  const markerPlaces = [polylinePath[0], polylinePath[polylinePath.length - 1]];

  const bounds = new navermaps.LatLngBounds(markerPlaces[0], markerPlaces[1]);

  useEffect(() => {
    for (let i = 1; i < polylinePath.length - 1; i += 2) {
      bounds.extend(polylinePath[i]);
    }
  }, []);

  return markerPlaces[0] ? (
    <MapDiv className={'map-wrapper'} onClick={handleOpenNaverMapApp}>
      <OpenNaverMapAppBtn>
        <img width={15} src={'/naver-map-logo.png'} alt={'naver-map-logo'} />
        지도앱 가기
      </OpenNaverMapAppBtn>
      <NaverMap defaultBounds={bounds} ref={setMap} logoControl={false}>
        {markerPlaces.map((item, index) => (
          <MarkerContainer
            key={index === 0 ? 'origin' : 'destination'}
            id={index === 0 ? 'origin' : 'destination'}
            position={{ longitude: item.x, latitude: item.y }}
            title={index === 0 ? '출발' : '도착'}
            anchor={[22, 53]}
            showPlace={false}
            activeMarker={null}
          />
        ))}
      </NaverMap>
    </MapDiv>
  ) : (
    <NoData style={{ margin: 'auto' }}>경로 데이터를 찾을 수 없습니다</NoData>
  );
};

export default Map;
