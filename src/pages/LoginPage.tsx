import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getKakaoInga } from '@/api/kakaoApi.ts';
import { BackButton } from '@/components/common/Layout/Header/Header.style.ts';
import TaxiIcon from '@/assets/icons/login/taxi-icon.svg?react';
import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';

const LoginPage = () => {
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

export default LoginPage;

const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: var(--font-large);

  span {
    font-weight: var(--weight-bold);
  }
`;

const LoginButton = styled.button`
  width: 100%;
  position: fixed;
  bottom: 60px;

  & > img {
    margin: 0 auto;
  }
`;

const Header = styled.header`
  padding: 10px 20px;
  position: absolute;
  top: 0;
  height: var(--header-height);
  display: flex;
  align-items: center;
`;
