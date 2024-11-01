import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterDataKey } from '@/types';
import { SearchPageProps } from '@/types/props';

import Header from '@/components/common/Layout/Header';
import SearchList from '@/components/Search/SearchList.tsx';
import { SearchInput } from '@/components/Search/Search.style.ts';
import { BackButton } from '@/components/common/Layout/Header/Header.style';
import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';

const SearchPage = ({
  step,
  setStep,
  setRegisterDataFunc,
}: SearchPageProps) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>('');
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  const listClickHandler = (lat: number, lng: number) => {
    if (step && setStep && setRegisterDataFunc) {
      // 팟생성에서 검색 시 사용
      const nextStep = step === 'searchOrigin' ? 'originMap' : 'destinationMap';

      const registerKey: RegisterDataKey =
        step === 'searchOrigin' ? 'originLocation' : 'destinationLocation';

      setRegisterDataFunc(registerKey, { latitude: lat, longitude: lng });

      setStep(nextStep);
    } else {
      //메인홈에서 검색 시 사용
      localStorage.setItem('Location', JSON.stringify({ lat, lng }));
      navigate('/');
    }
  };

  const backButtonClickHandler = () => {
    if (step && setStep) {
      step === 'searchOrigin' ? setStep('origin') : setStep('destination');
    } else {
      navigate(-1);
    }
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
