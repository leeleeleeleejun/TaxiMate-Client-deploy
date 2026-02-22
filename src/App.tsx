import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Analytics } from '@vercel/analytics/react';
import Router from '@/Router.tsx';
import { useGetRefreshAccessTokenQuery } from '@/api/userApi.ts';
import { setIsLogin } from '@/domains/MyProfile/Slice/userSlice.ts';
import GlobalStyle from '@/styles/GlobalStyle.ts';
import { ErrorBoundary } from '@suspensive/react';
import ErrorBoundaryFallback from '@/ErrorBoundaryFallback.tsx';
import {NavermapsProvider} from "react-naver-maps";
import { logger } from '@/utils/logger.ts';

const kakaoJsKey = import.meta.env.VITE_KAKAO_JS_KEY;
const naverMapApi = import.meta.env.VITE_NAVER_MAP_API;

window.Kakao.init(kakaoJsKey);

// SDK 초기화 여부를 판단합니다.
logger.log('Kakao SDK initialized:', window.Kakao.isInitialized());
const splashDom = document.getElementById('splash');
splashDom?.remove();

function App() {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false); // 렌더링 준비 상태
  const { isSuccess, isLoading } = useGetRefreshAccessTokenQuery(null);

  useEffect(() => {
    // API 호출이 완료될 때까지 기다림
    if (!isLoading) {
      if (isSuccess) {
        dispatch(setIsLogin(true));
      }
      setIsReady(true); // 모든 작업이 완료되었음을 표시
    }
  }, [isSuccess, isLoading, dispatch]);

  if (!isReady) return null;

  return (
    <ErrorBoundary fallback={ErrorBoundaryFallback}>
      <Analytics />
      <NavermapsProvider ncpKeyId={naverMapApi}>
        <GlobalStyle />
        <Router />
      </NavermapsProvider>
    </ErrorBoundary>
  );
}

export default App;
