import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from './api/tasksApi';
import authReducer from './slices/authSlice';
import { productApi } from './api/productApi';

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware).concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
