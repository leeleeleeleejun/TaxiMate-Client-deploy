import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavermaps } from 'react-naver-maps';

import { useLazyGetPostsQuery } from '@/api/postApi.ts';
import useWatchLocation from '@/hooks/useWatchLocation.ts';
import reactNativePostMessage from '@/utils/reactNativePostMessage.ts';
import { setCenterLocation } from '@/components/Home/Map/HomeMapSlice.ts';

import Header from '@/components/common/Layout/Header';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';
import Footer from '@/components/common/Layout/Footer';
import Map from '@/components/Home/Map';
import PostList from '@/components/Home/PostList';
import { Main } from '@/components/Home/Map/Map.style.ts';
import SearchBar from '@/components/Home/SearchBar';
import ResearchButton from '@/components/Home/ResearchButton';
import MoveCurrentLocation from '@/components/Home/MoveCurrentLocation';
import LoadingIcon from '@/components/common/LoadingIcon';

import TaxiIcon from '@/assets/icons/header/taxi-icon.svg?react';
import KnuLogoIcon from '@/assets/icons/header/knu-logo-icon.svg?react';
import { defaultLocation } from '@/utils/getCurrentlocation.ts';

let isFirstLoading = true;

const HomePage = () => {
  const naverMaps = useNavermaps();
  const dispatch = useDispatch();
  const { userLocation } = useWatchLocation();

  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [isActiveMyLocationButton, setIsActiveMyLocationButton] =
    useState<boolean>(true);
  const [isActivePostItem, setIsActivePostItem] = useState<string | null>(null);
  const [postListHeight, setPostListHeight] = useState(0);
  const [showResearchButton, setShowResearchButton] = useState(false);
  const [trigger, { data, isLoading: getPostsIsLoading }] =
    useLazyGetPostsQuery();

  const moveCurrentLocationFunc = async () => {
    if (map && userLocation) {
      const latLng = new naverMaps.LatLng(userLocation);
      dispatch(setCenterLocation(userLocation));
      map.setCenter(latLng);
      getPostsQueryTrigger();
      setIsActiveMyLocationButton(true);
    } else {
      alert('위치 접근 권한이 거부되었습니다.');
    }
  };

  const getPostsQueryTrigger = () => {
    if (!map) return;
    const minLatitude = map.getBounds().minY();
    const minLongitude = map.getBounds().minX();
    const maxLatitude = map.getBounds().maxY();
    const maxLongitude = map.getBounds().maxX();
    trigger({
      minLatitude,
      minLongitude,
      maxLatitude,
      maxLongitude,
    });
    setShowResearchButton(false);
  };

  useEffect(() => {
    if (isFirstLoading && map) {
      (async () => {
        const data = await defaultLocation();
        map.setCenter(data);
        dispatch(setCenterLocation(data));
        getPostsQueryTrigger();
        isFirstLoading = false;
      })();
    }
    getPostsQueryTrigger();
  }, [map]);

  return (
    <>
      <Header>
        <HeaderItem>
          택시팟
          <TaxiIcon />
        </HeaderItem>
        <button
          onClick={() => {
            reactNativePostMessage('like_knu');
          }}
        >
          <KnuLogoIcon />
        </button>
      </Header>
      <Main>
        <SearchBar path={'/search'} />
        {showResearchButton && (
          <ResearchButton onClick={getPostsQueryTrigger} />
        )}
        {(getPostsIsLoading || isFirstLoading) && <LoadingIcon />}
        <MoveCurrentLocation
          moveCurrentLocationFunc={moveCurrentLocationFunc}
          isActiveMyLocationButton={isActiveMyLocationButton}
          isActivePostItem={isActivePostItem}
          postListHeight={postListHeight}
        />
        <Map
          map={map}
          setMap={setMap}
          setIsActiveMyLocationButton={setIsActiveMyLocationButton}
          isActivePostItem={isActivePostItem}
          setIsActivePostItem={setIsActivePostItem}
          setShowResearchButton={setShowResearchButton}
          userLocation={userLocation || null}
          data={data || []}
        />
      </Main>
      <PostList
        isActivePostItem={isActivePostItem}
        data={data || []}
        setPostListHeight={setPostListHeight}
      />
      <Footer />
    </>
  );
};

export default HomePage;
