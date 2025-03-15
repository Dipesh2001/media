import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mainAxios } from "../app/api";

export const adminApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/admin",
  }),
  endpoints: (builder) => ({
    registerAdmin: builder.mutation<Admin[], Partial<Admin>>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useRegisterAdminMutation } = adminApi;

export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
}
