import { baseApi } from '@/api/baseApi.ts';

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    event: builder.mutation<{ data: string }, string>({
      query: (data: string) => ({
        url: '/api/v1/events',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useEventMutation } = eventApi;
