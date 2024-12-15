const getCurrentLocation = async (): Promise<{
  lat: number;
  lng: number;
}> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(currentLocation);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      reject(new Error('Geolocation is not supported by this browser.'));
    }
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
