import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IList } from '../models/IList'

export const listApi = createApi({
  reducerPath: 'listApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['List'],
  endpoints: (build) => ({
    fetchLists: build.query<IList[], void>({
      query: () => ({
        url: '/list',
      }),
      providesTags: (result) => ['List'],
    }),
    postList: build.mutation<IList, IList>({
      query: (list) => ({
        url: '/list',
        method: 'POST',
        body: list,
      }),
      invalidatesTags: ['List'],
    }),

    updateList: build.mutation<IList, IList>({
      query: (list) => ({
        url: `/list/${list.id}`,
        method: 'PUT',
        body: list,
      }),
      invalidatesTags: ['List'],
    }),

    deleteList: build.mutation<IList, IList>({
      query: (list) => ({
        url: `/list/${list.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['List'],
    }),
  }),
})

export const {
  useFetchListsQuery,
  usePostListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
} = listApi

