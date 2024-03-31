import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IList } from '../models/IList'
import { useQueryClient } from 'react-query' // Import useQueryClient hook from react-query

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

export const useRefetchListsMutation = () => {
  const queryClient = useQueryClient() // Import useQueryClient hook from react-query
  const { refetch } = useFetchListsQuery()

  const refetchLists = () => {
    try {
      console.log('Refetching lists...')
      refetch() // Refetch the lists data
      queryClient.invalidateQueries('List') // Invalidate the query to ensure it's updated in the cache
    } catch (error) {
      console.error('Error refetching lists:', error)
    }
  }

  return refetchLists
}
