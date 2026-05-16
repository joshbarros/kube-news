import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Post, CreatePostInput, UpdatePostInput } from '@kube-news/types';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
    prepareHeaders: (headers) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        if (token) headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Post', id }],
    }),

    createPost: builder.mutation<Post, CreatePostInput>({
      query: (body) => ({ url: '/posts', method: 'POST', body }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    updatePost: builder.mutation<Post, { id: number; body: UpdatePostInput }>({
      query: ({ id, body }) => ({ url: `/posts/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_result, _err, { id }) => [{ type: 'Post', id }],
    }),

    deletePost: builder.mutation<void, number>({
      query: (id) => ({ url: `/posts/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
