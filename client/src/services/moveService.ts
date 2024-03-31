import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface FetchActivityResponse {
    taskId: number;
    listId: number;    
    newListId: number;
}

export const moveApi = createApi({
  reducerPath: 'moveApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['move'],
  endpoints: (build) => ({
    moveTask: build.mutation<{ listId: number; taskId: number; newListId: number }, FetchActivityResponse>({
      query: ({ listId, taskId, newListId }) => ({
        url: `/moveTask/${taskId}?listId=${listId}&newListId=${newListId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['move'],
    }),
  }),
});

export const { useMoveTaskMutation } = moveApi;
