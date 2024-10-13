import TaxiIcon from '@/assets/icons/login/taxi-icon.svg?react';
import styled from 'styled-components';
import { getKakaoInga } from '@/api/kakaoApi.ts';

const LoginPage = () => {
  return (
    <IconWrap>
      <TaxiIcon />
      <div>공주대학교</div>
      <span>택시팟</span>
      <LoginButton onClick={getKakaoInga}>
        <img src={'/kakao-login.png'} alt={'kakao-login-button'} />
      </LoginButton>
    </IconWrap>
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
