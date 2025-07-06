const isSameLocation = (
  loc1: { latitude: number; longitude: number },
  loc2: { latitude: number; longitude: number }
): boolean => {
  return loc1.latitude === loc2.latitude && loc1.longitude === loc2.longitude;
};

export default isSameLocation;
