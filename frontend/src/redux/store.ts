import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "./api/tasksApi";
import authReducer from "./slices/authSlice";
import { productApi } from "./api/productApi";
import { productRequestApi } from "./api/productRequestApi";
import { userApi } from "./api/userApi";
import { auditApi } from "./api/auditApi";
import { orderApi } from "./api/orderApi";

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [productRequestApi.reducerPath]: productRequestApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [auditApi.reducerPath]: auditApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tasksApi.middleware)
      .concat(productApi.middleware)
      .concat(productRequestApi.middleware)
      .concat(userApi.middleware)
      .concat(auditApi.middleware)
      .concat(orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
