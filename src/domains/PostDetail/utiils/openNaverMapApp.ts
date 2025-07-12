import type { Place } from '../types';
import formatNaverMapUrl from './formatNaverMapUrl.ts';
import redirectToStoreOrWeb from './redirectToStoreOrWeb.ts';

/**
 * 네이버 지도 앱으로 이동하거나, 앱이 없는 경우 스토어 또는 웹으로 리디렉션합니다.
 */
const openNaverMapApp = ({
  origin,
  destination,
}: {
  origin: Place;
  destination: Place;
}) => {
  const clickedAt = Date.now();

  // 1. 네이버 지도 앱 실행 시도
  location.href = formatNaverMapUrl({ origin, destination });

  // 2. 1.5초 후 앱이 설치되지 않은 경우 대체 경로 이동
  setTimeout(() => {
    const elapsed = Date.now() - clickedAt;
    if (elapsed < 2000) {
      redirectToStoreOrWeb(origin, destination);
    }
  }, 1500);
};

export default openNaverMapApp;
