import { baseApi } from '@/api/baseApi.ts';
import { API_PATH } from '@/constants/path.ts';
import { ChatList, ChatRoom } from '@/types/chat.ts';

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    participationChat: builder.mutation<{ message: string }, string>({
      query: (partyId) => ({
        url: API_PATH.CHAT.PARTICIPATION,
        method: 'POST',
        body: { partyId: Number(partyId) },
      }),
    }),
    leaveChat: builder.mutation<{ message: string }, string>({
      query: (partyId) => ({
        url: API_PATH.CHAT.PARTICIPATION,
        method: 'DELETE',
        body: { partyId: Number(partyId) },
      }),
    }),
    getChatList: builder.query<ChatRoom[], null>({
      query: () => API_PATH.CHAT.GET_CHAT_LIST,
      transformResponse: (response: { data: ChatRoom[] }) => {
        return response.data;
      },
      keepUnusedDataFor: 0,
    }),
    getChat: builder.query<ChatList, string>({
      query: (id) => API_PATH.CHAT.GET_CHAT.replace(':partyId', id),
      transformResponse: (response: { data: ChatList }) => {
        return response.data;
      },
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useParticipationChatMutation,
  useLeaveChatMutation,
  useGetChatListQuery,
  useGetChatQuery,
} = chatApi;
