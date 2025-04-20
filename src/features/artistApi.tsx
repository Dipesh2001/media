import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Artist, pagination, QueryResponse } from "../app/types";
import { successToast } from "../helper";

type ArtistListResponse = { artists: Artist[]; pagination: pagination };
interface ArtistResponse extends QueryResponse<ArtistListResponse> {}

export const artistApi = createApi({
  reducerPath: "artistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/artist`,
    credentials: "include",
  }),
  tagTypes: ["Artist"],
  endpoints: (builder) => ({
    // 📦 Create Artist
    createArtist: builder.mutation<Artist, FormData>({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Artist"],
      transformResponse: (response: QueryResponse<{ artist: Artist }>) => {
        successToast(response.message);
        return response.data.artist;
      },
    }),

    // 📚 Get All Artists
    getAllArtists: builder.query<
      ArtistListResponse,
      { page: number; size: number }
    >({
      query: ({ page, size }) => `/?page=${page}&size=${size}`,
      providesTags: ["Artist"],
      transformResponse: (response: ArtistResponse) => response.data,
    }),

    // 🔍 Get Single Artist
    getArtistById: builder.query<Artist, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Artist", id }],
      transformResponse: (response: QueryResponse<{ artist: Artist }>) =>
        response.data.artist,
    }),

    // 🔍 Get Search Artist
    getArtistBySearch: builder.mutation<Artist[], string>({
      query: (query) => `/?q=${query}`,
      transformResponse: (response: QueryResponse<{ artists: Artist[] }>) =>
        response.data.artists,
    }),

    // ✏️ Update Artist
    updateArtist: builder.mutation<Artist, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Artist", id },
        "Artist",
      ],
      transformResponse: (response: QueryResponse<{ artist: Artist }>) => {
        successToast(response.message);
        return response.data.artist;
      },
    }),

    // ❌ Delete Artist
    deleteArtist: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Artist"],
    }),

    // ✅ Toggle Artist Status
    toggleArtistStatus: builder.mutation<Artist, string>({
      query: (id) => ({
        url: `/${id}/status`,
        method: "PATCH",
      }),
      invalidatesTags: ["Artist"],
    }),
  }),
});

// 🧪 Export Hooks
export const {
  useCreateArtistMutation,
  useGetAllArtistsQuery,
  useGetArtistByIdQuery,
  useUpdateArtistMutation,
  useDeleteArtistMutation,
  useToggleArtistStatusMutation,
  useGetArtistBySearchMutation,
} = artistApi;
