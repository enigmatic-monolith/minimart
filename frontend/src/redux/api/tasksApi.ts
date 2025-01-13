import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tables, TablesInsert } from "../../database.types";

export type Task = Tables<"tasks">;
export type TaskCreate = TablesInsert<"tasks">;
const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
const taskRoute = "/task";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState, type }) => {
      const token = (getState() as any).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => taskRoute,
      providesTags: ["Task"]
    }),
    getTaskById: builder.query<Task, number>({
      query: (id) => `${taskRoute}/${id}`,
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),
    createTask: builder.mutation<Task, TaskCreate>({
      query: (task) => ({
        url: taskRoute,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<Task, Task>({
      query: (task) => {
        const { id, ...other } = task;
        return {
          url: `${taskRoute}/${task.id}`,
          method: "PUT",
          body: other,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Task", id }, { type: "Task" }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;
