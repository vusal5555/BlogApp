import apiSlice from "./ApiSlice";
import { POSTS_URL, UPLOADS_URL } from "../constants";

const postSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: ({ keyword }) => ({
        url: POSTS_URL,
        params: {
          keyword,
        },
      }),
      providesTags: ["Blog", "User"],
      keepUnusedDataFor: 5,
    }),
    getMyPosts: builder.query({
      query: ({ keyword }) => ({
        url: `${POSTS_URL}/mine`,
        params: {
          keyword,
        },
      }),
      providesTags: ["Blog", "User"],
      keepUnusedDataFor: 5,
    }),
    getSingPost: builder.query({
      query: (id) => ({
        url: `${POSTS_URL}/${id}`,
      }),
      providesTags: ["Blog"],
      keepUnusedDataFor: 5,
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/create`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Blog"],
    }),

    updatePost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.id}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Blog", "User"],
      providesTags: ["Blog", "User"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POSTS_URL}/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Blog", "User"],
    }),

    createComment: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.postId}/comments`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Blog", "User"],
    }),

    uploadBlogImage: builder.mutation({
      query: (data) => ({
        url: UPLOADS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetSingPostQuery,
  useCreatePostMutation,
  useUploadBlogImageMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useCreateCommentMutation,
  useGetMyPostsQuery,
} = postSlice;
