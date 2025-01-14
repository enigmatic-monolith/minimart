import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tables, TablesInsert, TablesUpdate } from "../../database.types";

export type Task = Tables<"tasks">;
export type TaskCreate = TablesInsert<"tasks">;
export type TaskUpdate = TablesUpdate<"tasks">;
export type UserTask = Tables<"user_tasks">;
export type TaskWithSubmissions = Task & { user_tasks: UserTask[], pending_count: number };
export type GetAllTasksResponse = TaskWithSubmissions[];
const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
const taskRoute = "/task";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<GetAllTasksResponse, void>({
      query: () => taskRoute,
      providesTags: ["Task"],
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
    updateTask: builder.mutation<
      Task,
      { id: number; task: Omit<TaskUpdate, "id"> }
    >({
      query: ({ id, task }) => {
        return {
          url: `${taskRoute}/${id}`,
          method: "PUT",
          body: task,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Task", id },
        { type: "Task" },
      ],
    }),
    archiveTask: builder.mutation<Task, number>({
      query: (id) => {
        return {
          url: `${taskRoute}/${id}/archive`,
          method: "PUT",
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: "Task", id },
        { type: "Task" },
      ],
    }),
    restoreTask: builder.mutation<Task, number>({
      query: (id) => {
        return {
          url: `${taskRoute}/${id}/restore`,
          method: "PUT",
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: "Task", id },
        { type: "Task" },
      ],
    }),
    approveUserTask: builder.mutation<Task, {userId: string; taskId: number}>({
      query: ({userId, taskId}) => {
        return {
          url: `${taskRoute}/${userId}/${taskId}/approve`,
          method: "PUT",
        };
      },
      invalidatesTags: (result, error, {userId, taskId}) => [
        { type: "Task", id: taskId },
        { type: "Task" },
      ],
    }),
    rejectUserTask: builder.mutation<Task, {userId: string; taskId: number}>({
      query: ({userId, taskId}) => {
        return {
          url: `${taskRoute}/${userId}/${taskId}/reject`,
          method: "PUT",
        };
      },
      invalidatesTags: (result, error, {userId, taskId}) => [
        { type: "Task", id: taskId },
        { type: "Task" },
      ],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useArchiveTaskMutation,
  useRestoreTaskMutation,
  useApproveUserTaskMutation,
  useRejectUserTaskMutation
} = tasksApi;
