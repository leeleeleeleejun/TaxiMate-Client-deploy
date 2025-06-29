import { Location } from '@/types';
import geolocationErrorMessage from '@/utils/location/geolocationErrorMessage.ts';
import toLocation from '@/utils/location/toLocation.ts';

const getCurrentLocation = async (): Promise<Location> => {
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported by this browser.');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(toLocation(position.coords)),
      (error) => {
        const errorMessage = geolocationErrorMessage(error.code, error.message);
        reject(errorMessage);
      },
      {
        maximumAge: 10000, // 10초 이내의 캐시된 위치 허용
        timeout: 5000, // 5초 타임아웃
        enableHighAccuracy: false, // 빠른 응답을 위해 낮은 정확도 사용
      }
    );
  });
};

export default getCurrentLocation;

export const defaultLocation = async () => {
  try {
    const { lat, lng } = await getCurrentLocation();
    return { lat, lng, isUserLocation: true };
  } catch (e) {
    return { lat: 36.4689627, lng: 127.1408071, isUserLocation: false };
  }
};
