import { useState } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { SearchPlace } from '@/types';
import { getSearchList } from '@/api/kakaoApi.ts';

const useSearchData = () => {
  const [searchListsData, setSearchListsData] = useState<SearchPlace[]>([]);
  const centerLocation = useSelector(
    (state: RootState) => state.homeMapSlice.centerLocation
  );

  const searchFunc = async (query: string) => {
    const result = await getSearchList(
      query,
      String(centerLocation.lng),
      String(centerLocation.lat)
    );

    setSearchListsData([...result.documents]);
  };

  return { searchListsData, searchFunc };
};

export default useSearchData;
