import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,

    credentials: "include",
  }),

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),

    fetchProfile: builder.query({
      query: () => "/users/profile",
      providesTags: ["fetchUser"],
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: email,
      }),
      transformResponse: (response) => response,
    }),

    verifyAndResetPassword: builder.mutation({
      query: (data) => ({
        url: "/users/verify-otp",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response,
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["fetchUser"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useFetchProfileQuery,
  useForgotPasswordMutation,
  useVerifyAndResetPasswordMutation,
  useUpdateProfileMutation,
} = authApi;
