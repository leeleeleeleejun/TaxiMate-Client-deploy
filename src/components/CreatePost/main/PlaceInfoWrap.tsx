import { useEffect, useState } from 'react';
import getAddressKakao from '@/api/kakaoApi.ts';
import { contentWrapType } from '@/types/props';

import LocationInfo from '@/components/common/LocationInfo';
import ContentWrap from '@/components/CreatePost/ContentWrap.tsx';
import LocationPinIcon from '@/assets/icons/createPost/location-pin-icon.svg?react';

interface PlaceInfoWrapProps extends contentWrapType {
  value2: { lat: number; lng: number };
}

const PlaceInfoWrap = ({ value, value2, setStep }: PlaceInfoWrapProps) => {
  const [originAddress, setOriginAddress] = useState({
    addressName: '',
    place: '',
  });
  const [destinationAddress, setDestinationAddress] = useState({
    addressName: '',
    place: '',
  });

  const setLocationInfo = async (
    lng: number,
    lat: number,
    target: React.Dispatch<
      React.SetStateAction<{ addressName: string; place: string }>
    >
  ) => {
    const result = await getAddressKakao(lng, lat);

    const { road_address, address } = result;

    const place =
      road_address?.building_name ||
      `${address.region_3depth_name} ${address.main_address_no}` +
        (address.sub_address_no && `-${address.sub_address_no}`);

    const addressName = road_address?.address_name || address.address_name;

    target({
      place,
      addressName,
    });
  };

  useEffect(() => {
    if (typeof value !== 'string') {
      setLocationInfo(value.lng, value.lat, setOriginAddress);
      setLocationInfo(value2.lng, value2.lat, setDestinationAddress);
    }
  }, []);

  if (!setStep) return null;

  return (
    <ContentWrap theme={'출도착지'} SvgIcon={LocationPinIcon}>
      <button
        onClick={() => {
          setStep('origin');
        }}
      >
        <LocationInfo
          keyWord={'출발지'}
          place={originAddress.place}
          address={originAddress.addressName}
          inCreate
        />
      </button>
      <button
        onClick={() => {
          setStep('destination');
        }}
      >
        <LocationInfo
          keyWord={'도착지'}
          place={destinationAddress.place}
          address={destinationAddress.addressName}
          inCreate
        />
      </button>
    </ContentWrap>
  );
};

export default PlaceInfoWrap;
