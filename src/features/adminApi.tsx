import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Admin, QueryResponse } from "../app/types";
import { errorToast, successToast } from "../helper";

type responseType = { admin: Admin; authToken: string };

interface adminResponse extends QueryResponse<responseType> {}

export const adminApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/admin",
    credentials: "include",
  }),
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    registerAdmin: builder.mutation<responseType, Partial<Admin>>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body: body,
      }),
      transformResponse: (res: adminResponse) => res?.data,
    }),
    loginAdmin: builder.mutation<responseType, Partial<Admin>>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin"],
      transformResponse: (res: adminResponse) => {
        console.log({ res });
        if (res.success) {
          console.log("here");
          successToast(res.message || "Admin logged in successfully.");
        } else {
          errorToast(res.message || "Something went wrong.");
        }
        return res.data;
      },
    }),
    logoutAdmin: builder.mutation<responseType, void>({
      query: () => "/logout",
      invalidatesTags: ["Admin"],
    }),
    validateAdmin: builder.query<responseType, void>({
      query: () => "/validate-auth",
      providesTags: ["Admin"],
      transformResponse: (res: adminResponse) => res?.data,
    }),
  }),
});

export const {
  useRegisterAdminMutation,
  useLoginAdminMutation,
  useValidateAdminQuery,
  useLogoutAdminMutation,
} = adminApi;
