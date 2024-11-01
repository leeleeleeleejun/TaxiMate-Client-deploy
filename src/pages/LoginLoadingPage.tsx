import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import reactNativePostMessage from '@/utils/reactNativePostMessage.ts';
import { useGetAccessTokenQuery } from '@/api/userApi.ts';
import { setIsLogin } from '@/components/MyProfile/userSlice.ts';
import useErrorHandle from '@/hooks/useErrorHandle.ts';

const LoginLoadingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code') || '';

  const {
    isLoading: isTokenLoading,
    isSuccess: isTokenSuccess,
    isError: isTokenError,
    error: tokenError,
  } = useGetAccessTokenQuery({ code });

  useErrorHandle(tokenError);

  // 토큰이 성공적으로 받아졌을 때
  useEffect(() => {
    if (!isTokenLoading && isTokenSuccess) {
      dispatch(setIsLogin(true));
      reactNativePostMessage('push_notification');
      navigate('/');
    } else if (isTokenError) {
      alert('로그인에 실패했습니다.');
      navigate('/login');
    }
  }, [isTokenLoading, isTokenSuccess, isTokenError]);

  return null;
};

export default LoginLoadingPage;
