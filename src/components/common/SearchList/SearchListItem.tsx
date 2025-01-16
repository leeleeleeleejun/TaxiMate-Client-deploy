import { MatchText, SearchListItemContainer } from './SearchList.style.ts';
import LocationDotIcon from '@/assets/icons/postList/location-dot-icon.svg?react';

const SearchListItem = ({
  inputValue,
  placeName,
  address,
  clickHandler,
}: {
  inputValue: string;
  placeName: string;
  address: string;
  clickHandler: () => void;
}) => {
  return (
    <SearchListItemContainer onClick={clickHandler}>
      <div>
        <LocationDotIcon />
        <SetPlaceName placeName={placeName} inputValue={inputValue} />
      </div>
      <span>{address}</span>
    </SearchListItemContainer>
  );
};

export default SearchListItem;

const SetPlaceName = ({
  placeName,
  inputValue,
}: {
  placeName: string;
  inputValue: string;
}) => {
  const highlightWord = () => {
    const regex = new RegExp(`(${inputValue})`, 'gi');
    const parts = placeName.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? <MatchText key={index}>{part}</MatchText> : part
    );
  };

  return <h3>{highlightWord()}</h3>;
};
