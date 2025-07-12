import { Place } from '../types';

const formatNaverMapUrl = ({
  origin,
  destination,
}: {
  origin: Place;
  destination: Place;
}) => {
  return `nmap://route/car?slat=${origin.lat}&slng=${origin.lng}&sname=${origin.name}&dlat=${destination.lat}&dlng=${destination.lng}&dname=${destination.name}&appname=com.example.myapp`;
};

export default formatNaverMapUrl;
