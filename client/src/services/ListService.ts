import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IList } from '../models/IList'

export const listApi = createApi({
  reducerPath: 'listApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['List'],
  endpoints: (build) => ({
    fetchLists: build.query<IList[], { boardId: number }>({
      query: ({ boardId }) => ({
        url: `/list/board/${boardId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: (result) => ['List'],
    }),
    postList: build.mutation<IList, { name: string; boardId: number }>({
      query: ({ name, boardId }) => ({
        url: `/list/?boardId=${boardId}`, // Include boardId in the URL
        method: 'POST',
        body: { name }, // Send only the name in the request body
      }),
      invalidatesTags: ['List'],
    }),

    updateList: build.mutation<IList, { name: string; list_id: number }>({
      query: ({ list_id, name }) => ({
        url: `/list/${list_id}`,
        method: 'PUT',
        body: { name }, // You need to pass the name within an object
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
