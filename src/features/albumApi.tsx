import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Album, Pagination, QueryResponse } from "../app/types";

type responseType = { albums: Album[]; pagination: Pagination };

interface albumResponse extends QueryResponse<responseType> {}

export const albumApi = createApi({
  reducerPath: "albumApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/album`,
    credentials: "include",
  }),
  tagTypes: ["Album"],
  endpoints: (builder) => ({
    // 📦 Create Album
    createAlbum: builder.mutation<Album, FormData>({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Album"],
    }),

    // 📚 Get All Albums
    getAllAlbums: builder.query<responseType, { page: number; size: number }>({
      query: ({ page, size }) => `/?page=${page}&size=${size}`,
      providesTags: ["Album"],
      transformResponse: (response: albumResponse) => response.data,
    }),

    // 🔍 Get Single Album
    getAlbumById: builder.query<Album, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Album", id }],
    }),

    // ✏️ Update Album
    updateAlbum: builder.mutation<Album, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Album", id },
        "Album",
      ],
    }),

    // ❌ Delete Album
    deleteAlbum: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Album"],
    }),

    // ✅ Toggle Album Status
    toggleAlbumStatus: builder.mutation<Album, string>({
      query: (id) => ({
        url: `/${id}/status`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Album", id }, "Album"],
    }),
  }),
});

// 🧪 Export hooks
export const {
  useCreateAlbumMutation,
  useGetAllAlbumsQuery,
  useGetAlbumByIdQuery,
  useUpdateAlbumMutation,
  useDeleteAlbumMutation,
  useToggleAlbumStatusMutation,
} = albumApi;
