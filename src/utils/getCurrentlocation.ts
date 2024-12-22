import { Location } from '@/types/props';

const getCurrentLocation = async (): Promise<Location> => {
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported by this browser.');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        resolve(currentLocation);
      },
      (error) => {
        let errorMessage: string;

        // 더 명확한 에러 메시지 제공
        switch (error.code) {
          case 1:
            errorMessage = '위치 접근 권한이 거부되었습니다.';
            break;
          case 2:
            errorMessage = '위치를 확인할 수 없습니다.';
            break;
          case 3:
            errorMessage = '위치 확인 시간이 초과되었습니다.';
            break;
          default:
            errorMessage = error.message;
        }

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
    return { lat, lng };
  } catch (e) {
    return { lat: 36.4689627, lng: 127.1408071 };
  }
};
