import { baseApi } from '@/api/baseApi.ts';
import { API_PATH } from '@/constants/path.ts';
import { CreatePostRes, Post, PostDetail } from '@/types/post.ts';
import { RegisterData } from '@/types';

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<
      Post[],
      {
        minLatitude: number;
        minLongitude: number;
        maxLatitude: number;
        maxLongitude: number;
      }
    >({
      query: (arg) => ({
        url: API_PATH.POST.GET.ALL,
        params: arg,
      }),
      transformResponse: (response: { data: Post[] }) => response.data,
      keepUnusedDataFor: 0,
    }),
    getPostById: builder.query<PostDetail, string>({
      query: (id) => API_PATH.POST.GET.BY_ID.replace(':partyId', id),
      transformResponse: (response: { data: PostDetail }) => response.data,
      keepUnusedDataFor: 5,
    }),
    getJoinPosts: builder.query<Post[], string>({
      query: () => API_PATH.POST.GET.JOIN_POSTS,
      transformResponse: (response: { data: Post[] }) => response.data,
      keepUnusedDataFor: 0,
    }),
    getClosePosts: builder.query<Post[], string>({
      query: () => API_PATH.POST.GET.CLOSE_POSTS,
      transformResponse: (response: { data: Post[] }) => response.data,
      keepUnusedDataFor: 0,
    }),
    createPost: builder.mutation<CreatePostRes, RegisterData>({
      query: (patch) => ({
        url: API_PATH.POST.POST,
        method: 'POST',
        body: patch,
      }),
    }),
  }),
});

export const {
  useLazyGetPostsQuery,
  useGetPostByIdQuery,
  useGetJoinPostsQuery,
  useGetClosePostsQuery,
  useCreatePostMutation,
} = postApi;
