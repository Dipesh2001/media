import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Album, pagination, QueryResponse } from "../app/types";
import { successToast } from "../helper";

type responseType = { albums: Album[]; pagination: pagination };

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
      transformResponse: (response: QueryResponse<{ album: Album }>) => {
        successToast(response.message);
        return response.data.album;
      },
    }),

    // 📚 Get All Albums
    getAllAlbums: builder.query<
      responseType,
      { page: number; size: number; search: string; sortBy: string }
    >({
      query: ({ page, size, search, sortBy }) =>
        `/?page=${page}&size=${size}&search=${search}&sortBy=${sortBy}`,
      providesTags: ["Album"],
      transformResponse: (response: albumResponse) => response.data,
    }),

    // 🔍 Get Single Album
    getAlbumById: builder.query<Album, string>({
      query: (id) => `/${id}`,
      transformResponse: (response: QueryResponse<{ album: Album }>) =>
        response.data.album,
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
      transformResponse: (response: QueryResponse<{ album: Album }>) => {
        successToast(response.message);
        return response.data.album;
      },
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
      invalidatesTags: ["Album"],
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
