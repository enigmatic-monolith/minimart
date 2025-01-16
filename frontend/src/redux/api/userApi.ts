import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tables } from "../../database.types";

export type User = Tables<'users'>;
const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
const userRoute = "/users";

export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      query: (id) => `${userRoute}/${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserByIdQuery
} = userApi;
