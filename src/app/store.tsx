import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "../features/adminApi";
import { userApi } from "../features/userApi";
import { albumApi } from "../features/albumApi";
import { artistApi } from "../features/artistApi";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer, // Add API slice reducer
    [userApi.reducerPath]: userApi.reducer, // Add API slice reducer
    [albumApi.reducerPath]: albumApi.reducer, // Add API slice reducer
    [artistApi.reducerPath]: artistApi.reducer, // Add API slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      adminApi.middleware,
      userApi.middleware,
      albumApi.middleware,
      artistApi.middleware,
    ]), // Add API middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
