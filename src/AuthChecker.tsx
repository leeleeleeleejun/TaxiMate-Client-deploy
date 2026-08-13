import { Navigate, Outlet } from 'react-router-dom';
import { CLIENT_PATH } from '@/constants/path.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetRefreshAccessTokenQuery } from '@/api/userApi.ts';
import LoadingIcon from '@/components/common/LoadingIcon';

const AuthChecker = () => {
  const isLogin = useSelector((state: RootState) => state.userSlice.isLogin);
  // App.tsx가 앱 부팅 시 실행한 것과 동일한 쿼리(캐시 공유, 추가 요청 없음).
  // 초기 토큰 갱신이 끝나기 전에 로그인 여부를 판단하면 안 되므로 대기한다.
  const { isLoading, isUninitialized } = useGetRefreshAccessTokenQuery(null);

  if (isLoading || isUninitialized) {
    return <LoadingIcon />;
  }

  if (!isLogin) {
    return <Navigate to={CLIENT_PATH.LOGIN} replace={true} state={'/'} />;
  }
  return <Outlet />;
};

export default AuthChecker;
