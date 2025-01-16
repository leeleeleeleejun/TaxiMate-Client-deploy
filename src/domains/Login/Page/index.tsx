import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '@/components/common/Layout/Header/Header.style.ts';
import TaxiIcon from '@/assets/icons/login/taxi-icon.svg?react';
import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';

import { Header, IconWrap, LoginButton } from './Login.style.ts';
import { getKakaoInga } from '../api/getKakaoInga.ts';

const Index = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state: RootState) => state.userSlice.isLogin);

  return (
    <>
      <Header>
        <BackButton onClick={() => navigate('/', { replace: true })}>
          <ArrowLeftIcon />
        </BackButton>
      </Header>
      <IconWrap>
        <TaxiIcon />
        <div>공주대학교</div>
        <span>택시팟</span>
        <LoginButton
          onClick={() => {
            if (isLogin) {
              navigate('/', { replace: true });
            } else {
              getKakaoInga();
            }
          }}
        >
          <img src={'/kakao-login.png'} alt={'kakao-login-button'} />
        </LoginButton>
      </IconWrap>
    </>
  );
};

export default Index;
