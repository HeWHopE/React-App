import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ActivityLog } from '../models/IActivity'

export const activityApi = createApi({
  reducerPath: 'activityApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['activity'],
  endpoints: (build) => ({
    fetchActivity: build.query<ActivityLog[], { boardId: number }>({
      query: ({ boardId }) => ({
        url: `/activity/${boardId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: (result) => ['activity'],
    }),
  }),
})

export const { useFetchActivityQuery } = activityApi
