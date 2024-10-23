import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from '@/constants/path.ts';

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { setIsLogin } from '@/components/MyProfile/userSlice.ts';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//새로 고침 시 accessToken 변수 초기화 => refresh토큰으로 재요청
let accessToken: string | null = null;

export const getAccessToken = () => accessToken;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    setAccessToken(null);

    // Refresh token API 호출
    const refreshResult = (await baseQuery(
      API_PATH.USER.GET_REFRESH_ACCESS_TOKEN,
      api,
      extraOptions
    )) as { data?: { data: { accessToken: string } } };

    if (refreshResult.data) {
      // 새 accessToken을 설정
      setAccessToken(refreshResult.data.data.accessToken);

      // 원래 요청을 재시도
      result = await baseQuery(args, api, extraOptions);
    } else {
      // 리프레시 토큰 갱신 실패 시, 사용자 로그아웃 처리 등 추가적인 처리를 여기에 추가할 수 있음
      // alert('로그인이 만료되었습니다');
      setAccessToken(null);
      api.dispatch(setIsLogin(false));
    }
  }
  return result;
};

// base URL과 엔드포인트들로 서비스 정의
export const baseApi = createApi({
  reducerPath: 'baseApi',
  // refetchOnFocus: true,
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
