import { baseApi } from '@/api/baseApi.ts';
import { API_PATH } from '@/constants/v2/path.ts';
import { CreatePostRes, Post, RegisterData } from '@/types/v2/post.ts';

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPostsV2: builder.query<Post[], null>({
      query: () => API_PATH.POST.GET.ALL,
      transformResponse: (response: { data: Post[] }) => response.data,
      keepUnusedDataFor: 0,
    }),
    createPostV2: builder.mutation<CreatePostRes, RegisterData>({
      query: (patch) => ({
        url: API_PATH.POST.POST,
        method: 'POST',
        body: patch,
      }),
    }),
  }),
});

export const { useGetPostsV2Query, useCreatePostV2Mutation } = postApi;
