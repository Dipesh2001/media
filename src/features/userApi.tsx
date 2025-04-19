// src/redux/api/userApi.tsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UserType {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  favoriteSongs: string[];
  favoriteAlbums: string[];
  favoritePlaylists: string[];
  followedArtists: string[];
  myPlaylists: string[];
  createdAt: string;
  updatedAt: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/admin", // change to your actual backend URL
    credentials: "include", // if using cookies/auth sessions
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // 1. Get all users
    getAllUsers: builder.query<UserType[], void>({
      query: () => "user/fetch",
      providesTags: ["User"],
    }),
    // toggleUser: builder.mutation<{ success: boolean; id: string }, string>({
    //   query: (id) => ({
    //     url: `/users/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["User"],
    // }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
