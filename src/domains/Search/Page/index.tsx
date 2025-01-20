import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from '@/components/common/Layout/Header';
import SearchList from '@/components/common/SearchList';
import { SearchInput } from './Search.style.ts';
import { BackButton } from '@/components/common/Layout/Header/Header.style';
import { setCenterLocation } from '@/domains/Home/components/Map/HomeMapSlice.ts';
import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>('');
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  const listClickHandler = (lat: number, lng: number) => {
    //메인홈에서 검색 시 사용
    dispatch(setCenterLocation({ lat, lng }));
    navigate('/', { replace: true });
  };

  const backButtonClickHandler = () => {
    navigate(-1);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Header>
        <BackButton onClick={backButtonClickHandler}>
          <ArrowLeftIcon />
        </BackButton>
        <SearchInput
          ref={inputEl}
          placeholder='장소 또는 주소를 검색하세요'
          onChange={inputChangeHandler}
          value={inputValue}
        />
      </Header>
      <SearchList value={inputValue} listClickHandler={listClickHandler} />
    </>
  );
};

export default SearchPage;
