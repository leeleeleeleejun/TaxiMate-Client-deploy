import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetPostsV2Query } from '@/api/v2/postApi.ts';

import Header from '@/components/common/Layout/Header';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';
import reactNativePostMessage from '@/utils/reactNavtivePostMessage.ts';
import Footer from '@/components/common/Layout/Footer';
import OthersMessageBox from '@/components/v2/Home/OtherMessageBox.tsx';
import {
  ButtonBox,
  Main,
  RefreshButton,
} from '@/components/v2/Home/Home.style.ts';
import MyMessageBox from '@/components/v2/Home/MyMessageBox.tsx';
import LoadingIcon from '@/components/common/LoadingIcon';

import TaxiIcon from '@/assets/icons/header/taxi-icon.svg?react';
import KnuLogoIcon from '@/assets/icons/header/knu-logo-icon.svg?react';
import CreateButtonIcon from '@/assets/icons/footer/create-button-icon.svg?react';
import RefreshButtonIcon from '@/assets/icons/refresh-icon.svg?react';

const HomePage = () => {
  const { data, isLoading, isFetching, refetch } = useGetPostsV2Query(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (isFetching) {
      setIsSpinning(true);
    }
  }, [isFetching]);

  const handleAnimationEnd = () => {
    setIsSpinning(false);
  };

  const refetchFunc = () => {
    refetch();
  };

  if (!data) return <div>no data...</div>;
  if (isLoading) {
    return <LoadingIcon />;
  }

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
        {data.map((post) =>
          post.host.isMe ? (
            <MyMessageBox
              key={post.id}
              id={post.id}
              messages={post.title}
              time={post.createdAt}
              status={post.status}
              currentParticipants={post.currentParticipants}
              maxParticipants={post.maxParticipants}
              refetchFunc={refetchFunc}
            />
          ) : (
            <OthersMessageBox
              key={post.id}
              id={post.id}
              messages={post.title}
              time={post.createdAt}
              status={post.status}
              name={post.host.nickname}
              img={post.host.profileImage}
              currentParticipants={post.currentParticipants}
              maxParticipants={post.maxParticipants}
              refetchFunc={refetchFunc}
            />
          )
        )}
      </Main>
      <ButtonBox>
        <RefreshButton onClick={refetch} $isSpinning={isSpinning}>
          <RefreshButtonIcon onAnimationEnd={handleAnimationEnd} />
        </RefreshButton>
        <Link to={'/create-post'}>
          <CreateButtonIcon />
        </Link>
      </ButtonBox>
      <Footer />
    </>
  );
};

export default HomePage;
