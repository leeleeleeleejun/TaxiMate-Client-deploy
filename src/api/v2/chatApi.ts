import { baseApi } from '@/api/baseApi.ts';
import { API_PATH } from '@/constants/v2/path.ts';
import { ChatList } from '@/types/v2/chat.ts';

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChat: builder.query<ChatList, string>({
      query: (id) => API_PATH.CHAT.GET_CHAT.replace(':partyId', id),
      transformResponse: (response: { data: ChatList }) => {
        return response.data;
      },
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetChatQuery } = chatApi;
