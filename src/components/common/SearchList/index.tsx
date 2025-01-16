import { useEffect } from 'react';
import useSearchData from '@/hooks/useSearchData.ts';
import { SearchListContainer } from './SearchList.style.ts';
import SearchListItem from '@/components/common/SearchList/SearchListItem.tsx';

const SearchList = ({
  value,
  listClickHandler,
}: {
  value: string;
  listClickHandler: (lat: number, lng: number) => void;
}) => {
  const { searchListsData, searchFunc } = useSearchData();
  useEffect(() => {
    if (value.length > 0) {
      searchFunc(value);
    }
  }, [value]);

  return (
    <SearchListContainer>
      {value &&
        searchListsData.map((item) => (
          <SearchListItem
            key={item.id}
            inputValue={value}
            placeName={item.place_name}
            address={item.road_address_name || item.address_name}
            clickHandler={() => {
              listClickHandler(Number(item.y), Number(item.x));
            }}
          />
        ))}
    </SearchListContainer>
  );
};

export default SearchList;
