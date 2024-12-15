import { Navigate, Outlet } from 'react-router-dom';
import { CLIENT_PATH } from '@/constants/path.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const AuthChecker = () => {
  const isLogin = useSelector((state: RootState) => state.userSlice.isLogin);

  if (!isLogin) {
    return <Navigate to={CLIENT_PATH.LOGIN} replace={true} state={'/'} />;
  }
  return isLogin && <Outlet />;
};

export default AuthChecker;
