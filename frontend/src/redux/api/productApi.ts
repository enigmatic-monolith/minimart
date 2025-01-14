import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tables } from "../../database.types";

export type Product = Tables<'products'>;
const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
const productRoute = "/product";

export const productApi = createApi({
  reducerPath: "productApi",
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
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => productRoute,
      providesTags: ["Product"],
    })
  }),
});

export const {
  useGetAllProductsQuery,
} = productApi;
