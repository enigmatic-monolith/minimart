import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tables } from "../../database.types";

export type ProductRequest = Tables<"product_requests">;

const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
const productRequestRoute = "/product_request";

export const productRequestApi = createApi({
  reducerPath: "productRequestApi",
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
  tagTypes: ["Product_Request"],
  endpoints: (builder) => ({
    getAllProductRequest: builder.query<ProductRequest[], void>({
      query: () => productRequestRoute,
      providesTags: ["Product_Request"],
    }),
    approveProductRequest: builder.mutation<
      ProductRequest,
      number
    >({
      query: (id) => {
        return {
          url: `${productRequestRoute}/${id}/approve`,
          method: "PUT",
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: "Product_Request", id },
        { type: "Product_Request" },
      ],
    }),
    rejectProductRequest: builder.mutation<
      ProductRequest,
      number
    >({
      query: (id) => {
        return {
          url: `${productRequestRoute}/${id}/reject`,
          method: "PUT",
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: "Product_Request", id },
        { type: "Product_Request" },
      ],
    }),
  }),
});

export const {
  useGetAllProductRequestQuery,
  useApproveProductRequestMutation,
  useRejectProductRequestMutation
} = productRequestApi;
