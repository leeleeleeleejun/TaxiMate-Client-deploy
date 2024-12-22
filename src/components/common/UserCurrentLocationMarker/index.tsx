import { Marker, useNavermaps } from 'react-naver-maps';
import { Location } from '@/types/props';

const UserCurrentLocationMarker = ({ position }: { position: Location }) => {
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
