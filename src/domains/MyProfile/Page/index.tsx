import { Link } from 'react-router-dom';
import { useGetProfileQuery } from '@/api/userApi.ts';

import Header from '@/components/common/Layout/Header';
import Footer from '@/components/common/Layout/Footer';
import UserContainer from '@/components/common/UserContainer';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';
import LoadingIcon from '@/components/common/LoadingIcon';
import NoData from '@/components/common/NoData.tsx';

import MyProfileIcon from '@/assets/icons/header/my-porfile-icon.svg?react';
import MenuItem from '@/domains/MyProfile/components/MenuItem.tsx';
import FileIcon from '@/assets/icons/myprofile/file-icon.svg?react';
// import NoticeIcon from '@/assets/icons/notice-icon.svg?react';
// import Toggle from '@/components/common/Toggle.tsx';

import { Container, Menu } from './page.style.ts';

const Index = () => {
  const { data, isLoading } = useGetProfileQuery(null);
  if (isLoading) return <LoadingIcon />;
  if (!data) return <NoData>데이터를 찾을 수 없습니다</NoData>;

  return (
    <>
      <Header>
        <HeaderItem>
          내 정보
          <MyProfileIcon />
        </HeaderItem>
      </Header>
      <Container>
        <UserContainer img={data.profileImage} name={data.nickname} />
        <Menu>
          {/*<MenuItem content={'알림설정'} SvgIcon={NoticeIcon}>*/}
          {/*  <Toggle />*/}
          {/*</MenuItem>*/}
          <Link
            to={
              'https://www.notion.so/woopaca/722d2e1180f94eeead36ec09436d4576?pvs=4'
            }
          >
            <MenuItem content={'이용약관'} SvgIcon={FileIcon} />
          </Link>
        </Menu>
      </Container>
      <Footer />
    </>
  );
};

export default Index;
