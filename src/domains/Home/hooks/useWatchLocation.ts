import { useEffect, useState } from 'react';
import { Location } from '@/types';
import geolocationErrorMessage from '@/utils/location/geolocationErrorMessage';
import toLocation from '@/utils/location/toLocation.ts';

const useWatchLocation = () => {
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      (position) => setLocation(toLocation(position.coords)),
      (error) => {
        const errorMessage = geolocationErrorMessage(error.code, error.message);
        console.warn(errorMessage); // ✅ throw 대신 사이드이펙트 함수
      }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { userLocation: location };
};

export default useWatchLocation;
