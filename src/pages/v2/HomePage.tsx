import Header from '@/components/common/Layout/Header';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';
import reactNativePostMessage from '@/utils/reactNavtivePostMessage.ts';

import Footer from '@/components/common/Layout/Footer';
import OthersMessageBox from '@/components/v2/Home/OtherMessageBox.tsx';
import { ButtonBox, Main } from '@/components/v2/Home/Home.style.ts';
import MyMessageBox from '@/components/v2/Home/MyMessageBox.tsx';

import TaxiIcon from '@/assets/icons/header/taxi-icon.svg?react';
import KnuLogoIcon from '@/assets/icons/header/knu-logo-icon.svg?react';
import CreateButtonIcon from '@/assets/icons/footer/create-button-icon.svg?react';
import RefreshButtonIcon from '@/assets/icons/refresh-icon.svg?react';

const HomePage = () => {
  return (
    <>
      <Header>
        <HeaderItem>
          택시팟
          <TaxiIcon />
        </HeaderItem>
        <button
          onClick={() => {
            reactNativePostMessage('like_knu');
          }}
        >
          <KnuLogoIcon />
        </button>
      </Header>
      <Main>
        <OthersMessageBox
          messages={'1시 30분 쯤 학교에서 역 가실 분~'}
          name={'이준석'}
          img={''}
          time={'2024-08-05T00:04:21'}
          status={'NONE'}
        />
        <OthersMessageBox
          messages={
            '1시 30분 쯤 학교에서 역 가실 분~1시 30분 쯤 학교에서 역 가실 분~'
          }
          name={'이준석'}
          img={''}
          time={'2024-08-05T00:04:21'}
          status={'PARTICIPATING'}
        />
        <OthersMessageBox
          messages={
            "1시 30분 쯤 학교에서 역 가실 분~1시 30분 쯤 학교에서 역 가실 분~ 1시 30분 쯤 학교에서 역 가실 분~1시 30분 쯤 학교에서 역 가실 분~'"
          }
          name={'이준석'}
          img={''}
          time={'2024-08-05T00:04:21'}
          status={'PARTICIPATING'}
        />
        <MyMessageBox
          messages={
            "1시 30분 쯤 학교에서 역 가실 분~1시 30분 쯤 학교에서 역 가실 분~ 1시 30분 쯤 학교에서 역 가실 분~1시 30분 쯤 학교에서 역 가실 분~'"
          }
          time={'2024-08-05T00:04:21'}
          status={'PARTICIPATING'}
        />
      </Main>
      <ButtonBox>
        <button>
          <RefreshButtonIcon />
        </button>
        <button>
          <CreateButtonIcon />
        </button>
      </ButtonBox>
      <Footer />
    </>
  );
};

export default HomePage;
