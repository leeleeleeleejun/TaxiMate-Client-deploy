import { Marker, useNavermaps } from 'react-naver-maps';

const UserCurrentLocationMarker = ({
  position,
}: {
  position: { lat: number; lng: number };
}) => {
  const naverMaps = useNavermaps();

  return (
    <Marker
      position={new naverMaps.LatLng(position.lat, position.lng)}
      icon={{
        content: MarkerIcon,
      }}
    />
  );
};

export default UserCurrentLocationMarker;

const MarkerIcon = `
    <div class="user-marker-icon-container">
      <div class="user-marker-icon"/>
    </div>
  `;
