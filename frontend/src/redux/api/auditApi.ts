import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tables } from "../../database.types";

export type AuditLog = Tables<'audit_logs'>;
const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
const auditRoute = "/audit";

export const auditApi = createApi({
  reducerPath: "auditApi",
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
  tagTypes: ["Audit"],
  endpoints: (builder) => ({
    getAllAuditLogs: builder.query<AuditLog[], void>({
      query: () => auditRoute,
      providesTags: ["Audit"],
    }),
  }),
});

export const {
  useGetAllAuditLogsQuery
} = auditApi;
