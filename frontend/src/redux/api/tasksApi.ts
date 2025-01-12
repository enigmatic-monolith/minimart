import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Tables } from '../../database.types';

type Task = Tables<'tasks'>;
const baseUrl = import.meta.env.API_BASE_URL as string;

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
      providesTags: ['Tasks'],
    }),
    getTaskById: builder.query<Task, number>({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tasks', id }],
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation<Task, { id: number; task: Partial<Task> }>({
      query: ({ id, task }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Tasks', id }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;
