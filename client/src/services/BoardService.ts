import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IBoard } from '../models/IBoard'

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['board'],
  endpoints: (build) => ({
    fetchBoards: build.query<IBoard[], void>({
      query: () => ({
        url: '/board',
      }),
      providesTags: (result) => ['board'],
    }),
    postBoard: build.mutation<void, { name: string }>({
      query: ({ name }) => ({
        url: '/board',
        method: 'POST',
        body: { name }, // Assuming your backend expects an object with a 'name' property
      }),
      invalidatesTags: ['board'],
    }),

    updateBoard: build.mutation<IBoard, { id: number }>({
      query: (board) => ({
        url: `/board/${board.id}`,
        method: 'PUT',
        body: board,
      }),
      invalidatesTags: ['board'],
    }),
    deleteBoard: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/board/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['board'],
    }),
  }),
})

export const {
  useFetchBoardsQuery,
  usePostBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardApi
