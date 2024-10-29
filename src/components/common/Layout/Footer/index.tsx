import {
  Container,
  Nav,
} from '@/components/common/Layout/Footer/Footer.style.ts';
import NavItemContainer from '@/components/common/Layout/Footer/NavItemContainer.tsx';

import TaxiIcon from '@/assets/icons/footer/taxi-icon.svg?react';
import ChattingIcon from '@/assets/icons/footer/chatting-icon.svg?react';
// import CreateButtonIcon from '@/assets/icons/footer/create-button-icon.svg?react';
// import HistoryIcon from '@/assets/icons/footer/history-icon.svg?react';
import UserIcon from '@/assets/icons/footer/user-icon.svg?react';

const Footer = () => {
  return (
    <Container>
      <Nav>
        <NavItemContainer contentName={'메인'} path={'/'}>
          <TaxiIcon />
        </NavItemContainer>
        <NavItemContainer contentName={'채팅'} path={'/chat-list'}>
          <ChattingIcon />
        </NavItemContainer>
        {/*<NavItemContainer path={'/create-post'}>*/}
        {/*  <CreateButtonIcon />*/}
        {/*</NavItemContainer>*/}
        {/*<NavItemContainer contentName={'이용내역'} path={'/usage-history'}>*/}
        {/*  <HistoryIcon />*/}
        {/*</NavItemContainer>*/}
        <NavItemContainer contentName={'내 정보'} path={'/my-profile'}>
          <UserIcon />
        </NavItemContainer>
      </Nav>
    </Container>
  );
};

export default Footer;
