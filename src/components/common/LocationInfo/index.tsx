import {
  LocationInfoBody,
  LocationInfoContainer,
  LocationInfoHeader,
} from '@/components/common/LocationInfo/LocationInfo.style.ts';
import ArrowRightIcon from '@/assets/icons/common/arrow-right-icon.svg?react';

const LocationInfo = ({
  keyWord,
  place,
  address,
  inCreate,
}: {
  keyWord: string;
  place: string;
  address: string;
  inCreate?: boolean;
}) => {
  return (
    <LocationInfoContainer $inCreate={inCreate}>
      <LocationInfoHeader>
        <div>
          <span>{keyWord}</span>
          {place || address}
        </div>
        {inCreate && <ArrowRightIcon />}
      </LocationInfoHeader>
      {<LocationInfoBody>{place && address}</LocationInfoBody>}
    </LocationInfoContainer>
  );
};

export default LocationInfo;
