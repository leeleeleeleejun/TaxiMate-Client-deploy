import { useState, useRef, useEffect } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { SearchPlace } from '@/types';
import { getSearchList } from '@/api/kakaoApi.ts';

const useSearchData = () => {
  const [searchListsData, setSearchListsData] = useState<SearchPlace[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const centerLocation = useSelector(
    (state: RootState) => state.homeMapSlice.centerLocation
  );

  const searchFunc = async (query: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const result = await getSearchList(
          query,
          String(centerLocation.lng),
          String(centerLocation.lat)
        );
        setSearchListsData([...result.documents]);
      } catch (error) {
        setSearchListsData([]);
      }
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { searchListsData, searchFunc };
};

export default useSearchData;
