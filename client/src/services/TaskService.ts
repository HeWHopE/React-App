import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITask } from '../models/ITask';

export const taskApi = createApi({
    
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['Task'],
    endpoints: (build) => ({
        fetchTasks: build.query<ITask[], number>({
            query: (listId) => ({
                url: `/task?listId=${listId}`,
            }),
            providesTags: result => ['Task']
        }),

        postTask: build.mutation<ITask, { listId: number; task: ITask }>({
            query: ({ listId, task }) => ({
                url: `/task?listId=${listId}`,
                method: 'POST',
                body: task,
            }),
            invalidatesTags: ['Task']
        }),
        
        updateTask: build.mutation<ITask, { listId: number;  taskId: number; task: ITask }>({
            query: ({ listId, taskId , task}) => ({
                url: `/task/${taskId}?listId=${listId}`,
                method: 'PUT',
                body: task
            }),
            invalidatesTags: ['Task']
        }),

        deleteTask: build.mutation<ITask, { taskId: number; listId: number }>({
            query: ({ taskId, listId }) => ({
                url: `/task/${taskId}?listId=${listId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Task']
        })

    }),
});

export const { useFetchTasksQuery, usePostTaskMutation } = taskApi;
