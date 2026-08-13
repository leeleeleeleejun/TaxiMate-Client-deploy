import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Analytics } from '@vercel/analytics/react';
import Router from '@/Router.tsx';
import { useGetRefreshAccessTokenQuery } from '@/api/userApi.ts';
import { setIsLogin } from '@/features/user/userSlice.ts';
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
  // refresh 쿠키로 액세스 토큰을 백그라운드에서 재발급한다.
  // 화면 렌더링을 막지 않고, 인증이 필요한 라우트에서만 AuthChecker가 갱신 완료를 기다린다.
  const { isSuccess } = useGetRefreshAccessTokenQuery(null);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsLogin(true));
    }
  }, [isSuccess, dispatch]);

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
