import type { Place, UserAgentPlatform } from '../types';
import { APP_STORE_URL, PLAY_STORE_URL } from '../constants';

const getWebNaverMapUrl = (origin: Place, destination: Place): string =>
  `https://map.naver.com/p/directions/${origin.lng},${origin.lat},${origin.name},PLACE_POI/${destination.lng},${destination.lat},${destination.name},PLACE_POI/-/car?c=14.00,0,0,0,dh`;

const getUserAgentPlatform = (): UserAgentPlatform => {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  return 'unknown';
};

const redirectToStoreOrWeb = (origin: Place, destination: Place) => {
  const platform = getUserAgentPlatform();

  switch (platform) {
    case 'ios':
      location.href = APP_STORE_URL;
      break;
    case 'android':
      location.href = PLAY_STORE_URL;
      break;
    default:
      location.href = getWebNaverMapUrl(origin, destination);
  }
};

export default redirectToStoreOrWeb;
