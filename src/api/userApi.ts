import { baseApi, setAccessToken } from '@/api/baseApi.ts';
import { API_PATH } from '@/constants/path.ts';
import { UserProfile } from '@/types/user.ts';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccessToken: builder.query<{ accessToken: string }, { code: string }>({
      query: (arg) => ({
        url: API_PATH.USER.GET_ACCESS_TOKEN,
        params: arg,
      }),
      transformResponse: (response: { data: { accessToken: string } }) => {
        setAccessToken(response.data.accessToken);
        return response.data;
      },
    }),
    getRefreshAccessToken: builder.query<{ accessToken: string }, null>({
      query: () => API_PATH.USER.GET_REFRESH_ACCESS_TOKEN,
      transformResponse: (response: { data: { accessToken: string } }) => {
        setAccessToken(response.data.accessToken);
        return response.data;
      },
    }),
    getProfile: builder.query<UserProfile, null>({
      query: () => API_PATH.USER.GET_PROFILES,
      transformResponse: (response: { data: UserProfile }) => {
        return response.data;
      },
    }),
    setPushAlarm: builder.mutation<{ data: string }, string>({
      query: (data: string) => ({
        url: API_PATH.USER.SET_PUSH_ALARM,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAccessTokenQuery,
  useGetRefreshAccessTokenQuery,
  useGetProfileQuery,
  useSetPushAlarmMutation,
} = userApi;
