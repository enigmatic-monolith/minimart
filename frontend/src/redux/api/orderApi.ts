import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tables } from "../../database.types";
import { Product } from "./productApi";

export type Order = Tables<"orders">;
export type OrderItem = Tables<"order_items">;
export type OrderDetails = Order & {
  order_items: Omit<OrderItem, "id" | "order_id"> &
    {
      products: Pick<Product, "name" | "desc">;
    }[];
};
export type PlaceOrderResponse = { message: string; order_id: number };
export type PlaceOrderRequest = Pick<
  OrderItem,
  "product_id" | "price_at_purchase" | "quantity"
>[];
const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
const orderRoute = "/order";

export const orderApi = createApi({
  reducerPath: "orderApi",
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
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getAllOrdersByUser: builder.query<Order[], void>({
      query: () => orderRoute,
      providesTags: ["Order"],
    }),
    getOrderDetailsById: builder.query<OrderDetails, number>({
      query: (id: number) => `${orderRoute}/${id}`,
      providesTags: ["Order"],
    }),
    placeOrder: builder.mutation<Product, PlaceOrderRequest>({
      query: (request) => {
        return {
          url: orderRoute,
          method: "POST",
          body: request,
        };
      },
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetAllOrdersByUserQuery,
  useGetOrderDetailsByIdQuery,
  usePlaceOrderMutation,
} = orderApi;
