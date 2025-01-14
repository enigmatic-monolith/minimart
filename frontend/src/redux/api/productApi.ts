import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tables, TablesInsert, TablesUpdate } from "../../database.types";

export type Product = Tables<"products">;
export type ProductCreate = TablesInsert<"products">;
export type ProductUpdate = TablesUpdate<"products">;
export type UploadProductImageResponse = { image_url: string };

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
    }),
    createProduct: builder.mutation<Product, ProductCreate>({
      query: (product) => {
        return {
          url: productRoute,
          method: "POST",
          body: product,
        };
      },
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation<UploadProductImageResponse, File>({
      query: (file) => {
        const form = new FormData();
        form.append("file", file);
        return {
          url: `${productRoute}/image`,
          method: "POST",
          body: form,
        };
      },
    }),
    updateProduct: builder.mutation<
      Product,
      { id: number; product: Omit<ProductUpdate, "id"> }
    >({
      query: ({ id, product }) => {
        return {
          url: `${productRoute}/${id}`,
          method: "PUT",
          body: product,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        { type: "Product" },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useUploadProductImageMutation,
} = productApi;
