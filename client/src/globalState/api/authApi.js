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
    }),

     forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: email ,
      }),
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useFetchProfileQuery,
  useForgotPasswordMutation,
} = authApi;
