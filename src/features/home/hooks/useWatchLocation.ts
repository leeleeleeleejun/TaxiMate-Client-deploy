import { useEffect, useState } from 'react';
import { Location } from '@/types';
import geolocationErrorMessage from '@/utils/location/geolocationErrorMessage';
import toLocation from '@/utils/location/toLocation.ts';
import { logger } from '@/utils/logger.ts';

const useWatchLocation = () => {
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    if (!navigator.geolocation) {
      logger.warn('Geolocation is not supported by your browser');
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      (position) => setLocation(toLocation(position.coords)),
      (error) => {
        const errorMessage = geolocationErrorMessage(error.code, error.message);
        logger.warn(errorMessage);
      }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { userLocation: location };
};

export default useWatchLocation;
