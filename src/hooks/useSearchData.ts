import { useState } from 'react';
import { searchPlace } from '@/types';
import { getSearchList } from '@/api/searchAPI.ts';

const useSearchData = () => {
  const [searchListsData, setSearchListsData] = useState<searchPlace[]>([]);
  const centerLocation = JSON.parse(localStorage.getItem('Location') || '');

  const searchFunc = async (query: string) => {
    const result = await getSearchList(
      query,
      `${centerLocation.lat},${centerLocation.lng}`
    );

    setSearchListsData([...result.place, ...result.address]);
  };

  return { searchListsData, searchFunc };
};

export default useSearchData;
