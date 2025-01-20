import { useEffect, useState } from 'react';
import { Location } from '@/types';

const useWatchLocation = () => {
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
      return;
    }

    const newId = navigator.geolocation.watchPosition(
      (position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(currentLocation);
      },
      (error) => {
        let errorMessage: string;

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
        throw errorMessage;
      }
    );

    return () => {
      if (newId !== -1) {
        navigator.geolocation.clearWatch(newId);
      }
    };
  }, []);

  return { userLocation: location };
};

export default useWatchLocation;
